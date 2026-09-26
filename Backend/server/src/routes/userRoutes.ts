import { FastifyInstance } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware.js';
import { supabase, createUserClient, hasServiceRoleKey } from '../utils/supabase.js';

export default async function userRoutes(fastify: FastifyInstance) {
  // Apply auth middleware to all routes in this plugin
  fastify.addHook('preHandler', requireAuth);

  // Helper to get either admin client or user-scoped client
  const getClient = (token?: string) => {
    return hasServiceRoleKey ? supabase : createUserClient(token || '');
  };

  // Get current user's profile
  fastify.get('/profile', async (request, reply) => {
    const user = request.user;
    const client = getClient(request.token);
    
    const { data: profile, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      request.log.error(error, 'Error fetching user profile');
      return reply.status(500).send({ error: 'Failed to fetch user profile' });
    }

    if (!profile) {
      return reply.status(404).send({ error: 'Profile not found' });
    }

    return reply.send({ profile });
  });

  // Update current user's profile
  fastify.put('/profile', async (request, reply) => {
    const user = request.user;
    const body = request.body as Record<string, any>;
    const client = getClient(request.token);

    // Prevent users from escalating their own role if we strictly control roles
    if (body.role) {
      delete body.role;
    }

    const { data: updatedProfile, error } = await client
      .from('profiles')
      .update(body)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      request.log.error(error, 'Error updating user profile');
      return reply.status(500).send({ error: 'Failed to update user profile' });
    }

    return reply.send({ profile: updatedProfile });
  });
}
