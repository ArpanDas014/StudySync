import cors from '@fastify/cors';
import Fastify from 'fastify';
import userRoutes from './routes/userRoutes.js';
import landingRoutes from './routes/landingRoutes.js';
import liveRoutes from './routes/liveRoutes.js';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  });

  app.get('/health', async () => ({ status: 'ok', service: 'studysync-api' }));

  app.register(userRoutes, { prefix: '/api/user' });
  app.register(landingRoutes, { prefix: '/api/newsletter' });
  app.register(liveRoutes, { prefix: '/api/live' });

  return app;
}
