import { FastifyPluginAsync } from 'fastify';
import { AccessToken } from 'livekit-server-sdk';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || ''; // Normally we use service role for sensitive DB checks, but here we can just verify the user's token

export const liveRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post<{
    Body: { roomName: string; participantName: string };
    Headers: { authorization?: string };
  }>('/token', async (request, reply) => {
    const { roomName, participantName } = request.body;
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      return reply.status(401).send({ error: 'Missing authorization header' });
    }
    const token = authHeader.replace('Bearer ', '');

    // 1. Verify user via Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return reply.status(401).send({ error: 'Invalid authentication token' });
    }

    // 2. Generate LiveKit Token
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return reply.status(500).send({ error: 'LiveKit server secrets are not configured' });
    }

    // Create a new AccessToken
    const at = new AccessToken(apiKey, apiSecret, {
      identity: user.id, // User ID is the identity
      name: participantName || user.email,
    });

    // Grant permissions
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
