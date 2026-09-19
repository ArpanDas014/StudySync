import { FastifyInstance } from 'fastify';
import { supabase } from '../utils/supabase.js';

export default async function landingRoutes(fastify: FastifyInstance) {
  fastify.post('/subscribe', async (request, reply) => {
    const { email } = request.body as { email: string };
    
    if (!email) {
      return reply.status(400).send({ error: 'Email is required' });
    }

    // Insert into newsletter_subscribers table
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      // If error is unique constraint violation, they are already subscribed
      if (error.code === '23505') {
         return reply.send({ success: true, message: 'Already subscribed' });
      }
      request.log.error(error, 'Error subscribing to newsletter');
      return reply.status(500).send({ error: 'Failed to subscribe' });
    }

    return reply.send({ success: true });
  });
}
