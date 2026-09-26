import { FastifyPluginAsync } from 'fastify';
import { AccessToken } from 'livekit-server-sdk';
import { env } from '../config/env.js';
import { supabase } from '../utils/supabase.js';

export const liveRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Body: { roomName: string; participantName?: string };
    Headers: { authorization?: string };
  }>('/token', async (request, reply) => {
    if (!request.body || !request.body.roomName) {
      return reply.status(400).send({ error: 'Missing roomName in request body' });
    }

    const { roomName, participantName } = request.body;
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.replace('Bearer ', '');

    // 1. Verify user via Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return reply.status(401).send({ error: 'Invalid authentication token' });
    }

    // 2. Verify LiveKit Credentials
    const apiKey = env.LIVEKIT_API_KEY;
    const apiSecret = env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      request.log.error('LiveKit server secrets are not configured in environment');
      return reply.status(500).send({ error: 'LiveKit server secrets are not configured' });
    }

    // 3. Create LiveKit AccessToken
    const at = new AccessToken(apiKey, apiSecret, {
      identity: user.id,
      name: participantName || user.email || 'Participant',
    });

    // Grant room access permissions
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const livekitToken = await at.toJwt();
    return { token: livekitToken };
  });
};

export default liveRoutes;
