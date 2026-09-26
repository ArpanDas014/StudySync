import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { 
  commMic, 
  commMicMuted, 
  commCamera, 
  commCameraOff, 
  commScreenShare, 
  commLeaveRoom, 
  commChat, 
  commParticipants,
  commReaction 
} from './assets';
import { createClient } from '@supabase/supabase-js';
import { 
  LiveKitRoom, 
  useTracks, 
  VideoTrack, 
  useLocalParticipant,
  RoomAudioRenderer,
  useRoomContext
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track, RoomEvent } from 'livekit-client';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LiveRoomMockup({ setView, activeSessionId }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [chatMode, setChatMode] = useState<'chat' | 'participants'>('chat');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participantsCount, setParticipantsCount] = useState(0);

  useEffect(() => {
    if (!activeSessionId) {
      setView('live-sessions');
      return;
    }

    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setView('live-sessions');
        return;
      }
      setCurrentUser(user);

      const { data: session } = await supabase
        .from('live_sessions')
        .select('*, host:profiles(id, full_name)')
        .eq('id', activeSessionId)
        .single();
      
      setSessionInfo(session);

      await supabase.from('live_session_participants').upsert({
        session_id: activeSessionId,
        user_id: user.id,
        role: session?.host_id === user.id ? 'host' : 'participant',
        joined_at: new Date().toISOString()
      }, { onConflict: 'session_id,user_id' });

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const jwt = sessionData.session?.access_token;
        
        const res = await fetch(`${apiUrl}/api/live/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          body: JSON.stringify({
            roomName: activeSessionId,
            participantName: user.email
          })
        });
        
        if (!res.ok) throw new Error("Failed to fetch token");
        const json = await res.json();
        setToken(json.token);
      } catch (err) {
        console.error("Token error:", err);
        alert("Failed to connect to media server. Are you sure the backend is running?");
      }
    };
    init();

    const channel = supabase
      .channel(`room:${activeSessionId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'live_session_messages', filter: `session_id=eq.${activeSessionId}` }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_session_participants', filter: `session_id=eq.${activeSessionId}` }, () => {
        fetchParticipantCount();
      })
      .subscribe();

    fetchMessages();
    fetchParticipantCount();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeSessionId]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('live_session_messages')
      .select('*, profiles(full_name)')
      .eq('session_id', activeSessionId)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const fetchParticipantCount = async () => {
    const { count } = await supabase
      .from('live_session_participants')
      .select('id', { count: 'exact' })
      .eq('session_id', activeSessionId)
      .is('left_at', null);
    setParticipantsCount(count || 0);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    
    await supabase.from('live_session_messages').insert({
      session_id: activeSessionId,
      user_id: currentUser.id,
      content: newMessage.trim()
    });
    setNewMessage('');
  };

  const handleLeave = async () => {
    if (currentUser && activeSessionId) {
      await supabase.from('live_session_participants').update({ left_at: new Date().toISOString() })
        .eq('session_id', activeSessionId).eq('user_id', currentUser.id);
    }
    setView('live-sessions');
  };

  if (!token) return <div style={{ padding: '48px', textAlign: 'center', color: 'white' }}>Connecting to Live Session...</div>;

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={import.meta.env.VITE_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--theme-bg)', color: 'var(--theme-text-primary)' }}
    >
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--theme-surface)', borderBottom: '1px solid var(--theme-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--theme-text-secondary)' }} onClick={handleLeave}>
            <ChevronLeft size={24} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }}></div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{sessionInfo?.title || 'Live Session'}</h2>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>Host: {sessionInfo?.host?.full_name || 'Unknown'}</span>
          </div>
        </div>
      </div>

      <div className="live-room-flex">
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ flex: 1, minHeight: '260px', background: '#111827', borderRadius: '16px', overflow: 'hidden', position: 'relative', border: '1px solid var(--theme-border)' }}>
             <RoomAudioRenderer />
             <VideoGrid />
          </div>

          <div style={{ background: 'var(--theme-surface)', padding: '12px 18px', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', border: '1px solid var(--theme-border-strong)', marginTop: '16px', flexWrap: 'wrap' }}>
            <CustomControls onLeave={handleLeave} />
          </div>
        </div>

        <div className="live-room-chat-panel" style={{ width: '340px', background: 'var(--theme-surface)', borderLeft: '1px solid var(--theme-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--theme-border)' }}>
            <button onClick={() => setChatMode('chat')} style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', borderBottom: chatMode === 'chat' ? '2px solid #10B981' : '2px solid transparent', color: chatMode === 'chat' ? 'var(--theme-text-primary)' : 'var(--theme-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <img src={commChat} width={16} height={16} alt="" /> Chat
            </button>
            <button onClick={() => setChatMode('participants')} style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', borderBottom: chatMode === 'participants' ? '2px solid #10B981' : '2px solid transparent', color: chatMode === 'participants' ? 'var(--theme-text-primary)' : 'var(--theme-text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
              <img src={commParticipants} width={16} height={16} alt="" /> {participantsCount}
            </button>
          </div>

          {chatMode === 'chat' ? (
            <>
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.length === 0 && <div style={{ color: 'var(--theme-text-secondary)', textAlign: 'center' }}>No messages yet. Say hello!</div>}
                {messages.map(msg => (
                  <div key={msg.id} style={{ display: 'flex', gap: '12px' }}>
                    <div className="mockup-avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem', background: '#3B82F6', flexShrink: 0 }}>
                      {(msg.profiles?.full_name || 'U').substring(0,2)}
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', marginRight: '8px', color: msg.user_id === sessionInfo?.host_id ? '#10B981' : 'inherit' }}>
                        {msg.profiles?.full_name || 'User'} {msg.user_id === sessionInfo?.host_id && '(Host)'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', lineHeight: 1.4, wordBreak: 'break-word' }}>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid var(--theme-border)' }}>
                <form onSubmit={handleSendMessage} style={{ background: 'var(--theme-input-bg)', border: '1px solid var(--theme-border-strong)', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="Send a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, color: 'var(--theme-text-primary)' }} />
                  <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={commReaction} alt="Send" style={{ width: '20px', height: '20px' }} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              <div style={{ color: 'var(--theme-text-secondary)', textAlign: 'center' }}>Participant list sync running in background. Current count: {participantsCount}</div>
            </div>
          )}
        </div>
      </div>
    </LiveKitRoom>
  );
}

function VideoGrid() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: false },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { 
      updateOnlyOn: [
        RoomEvent.LocalTrackPublished,
        RoomEvent.LocalTrackUnpublished,
        RoomEvent.TrackPublished,
        RoomEvent.TrackUnpublished,
        RoomEvent.TrackSubscribed,
        RoomEvent.TrackUnsubscribed,
        RoomEvent.ActiveSpeakersChanged
      ], 
      onlySubscribed: false 
    }
  );
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', padding: '16px', height: '100%', overflow: 'auto' }}>
      {tracks.length === 0 && <div style={{ color: 'white', textAlign: 'center', width: '100%', alignSelf: 'center' }}>Waiting for participants to turn on camera...</div>}
      {tracks.map((trackRef: any) => (
        <div key={trackRef.participant.identity + trackRef.source} style={{ background: 'black', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
          <VideoTrack trackRef={trackRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px', color: 'white', fontSize: '0.8rem' }}>
            {trackRef.participant.name || trackRef.participant.identity} {trackRef.participant.isLocal ? '(You)' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomControls({ onLeave }: { onLeave: () => void }) {
  const { isMicrophoneEnabled, isCameraEnabled, isScreenShareEnabled } = useLocalParticipant();
  const room = useRoomContext();
  
  return (
    <>
      <button 
        className="live-ctrl-btn" 
        style={{ background: isMicrophoneEnabled ? 'var(--theme-input-bg)' : '#EF4444', border: isMicrophoneEnabled ? '1px solid var(--theme-border)' : 'none' }} 
        onClick={() => room.localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)}
        title={isMicrophoneEnabled ? "Mute Microphone" : "Unmute Microphone"}
      >
        <img src={isMicrophoneEnabled ? commMic : commMicMuted} width={20} height={20} alt="Mic" style={!isMicrophoneEnabled ? { filter: 'brightness(10)' } : undefined} />
      </button>
      <button 
        className="live-ctrl-btn" 
        style={{ background: isCameraEnabled ? 'var(--theme-input-bg)' : '#EF4444', border: isCameraEnabled ? '1px solid var(--theme-border)' : 'none' }} 
        onClick={() => room.localParticipant.setCameraEnabled(!isCameraEnabled)}
        title={isCameraEnabled ? "Turn off Camera" : "Turn on Camera"}
      >
        <img src={isCameraEnabled ? commCamera : commCameraOff} width={20} height={20} alt="Camera" style={!isCameraEnabled ? { filter: 'brightness(10)' } : undefined} />
      </button>
      <div style={{ width: '1px', height: '24px', background: 'var(--theme-border-strong)', margin: '0 8px' }}></div>
      <button 
        className="live-ctrl-btn" 
        style={{ background: isScreenShareEnabled ? '#3B82F6' : 'var(--theme-input-bg)', border: isScreenShareEnabled ? 'none' : '1px solid var(--theme-border)' }} 
        onClick={() => room.localParticipant.setScreenShareEnabled(!isScreenShareEnabled)}
        title="Share Screen"
      >
        <img src={commScreenShare} width={20} height={20} alt="Share Screen" style={isScreenShareEnabled ? { filter: 'brightness(10)' } : undefined} />
      </button>
      <div style={{ width: '1px', height: '24px', background: 'var(--theme-border-strong)', margin: '0 8px' }}></div>
      <button 
        style={{ background: 'linear-gradient(180deg, #EF4444 0%, #DC2626 100%)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
        onClick={onLeave}
      >
        <img src={commLeaveRoom} width={18} height={18} alt="" style={{ filter: 'brightness(10)' }} /> Leave Session
      </button>
      <style dangerouslySetInnerHTML={{__html: `
        .live-ctrl-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .live-ctrl-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
      `}} />
    </>
  );
}
