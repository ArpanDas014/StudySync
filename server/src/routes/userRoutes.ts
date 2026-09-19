import { FastifyInstance } from 'fastify';
import { requireAuth } from '../middleware/authMiddleware.js';
import { supabase } from '../utils/supabase.js';

export default async function userRoutes(fastify: FastifyInstance) {
  // Apply auth middleware to all routes in this plugin
  fastify.addHook('preHandler', requireAuth);

  // Get current user's profile
  fastify.get('/profile', async (request, reply) => {
    const user = request.user;
    
    // We use service role to query the profile because we already authenticated the user via middleware.
    // Alternatively, we could create a user-scoped Supabase client, but since we are a secure backend,
    // we can just query the database directly for this user's ID.
    const { data: profile, error } = await supabase
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

    // Prevent users from escalating their own role if we strictly control roles
    if (body.role) {
      delete body.role; // Example: only admins can change roles
    }

    const { data: updatedProfile, error } = await supabase
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
