import cors from '@fastify/cors';
import Fastify from 'fastify';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  });

  app.get('/health', async () => ({ status: 'ok', service: 'studysync-api' }));

  return app;
}
