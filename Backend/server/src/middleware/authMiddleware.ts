import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../utils/supabase.js';

// Extend FastifyRequest to include user and bearer token
declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
    token?: string;
  }
}

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply.status(401).send({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  // Verify the JWT with Supabase
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    request.log.error(error, 'Supabase JWT verification failed');
    reply.status(401).send({ error: 'Unauthorized: Invalid token' });
    return;
  }

  // Attach user and raw token to request
  request.user = user;
  request.token = token;
};
