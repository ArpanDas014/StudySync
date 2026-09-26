import cors from '@fastify/cors';
import Fastify, { FastifyInstance } from 'fastify';
import { env } from './config/env.js';
import userRoutes from './routes/userRoutes.js';
import landingRoutes from './routes/landingRoutes.js';
import liveRoutes from './routes/liveRoutes.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: env.NODE_ENV !== 'test',
  });

  // Parse configured origins (supports comma-separated list in CLIENT_URL)
  const configuredOrigins = env.CLIENT_URL.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  // Local development default origins
  const devOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];

  const allowedOrigins: (string | RegExp)[] = [
    ...new Set([...devOrigins, ...configuredOrigins]),
    // Allow all Vercel production and preview deployment URLs (*.vercel.app)
    /^https:\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)*\.)?vercel\.app$/,
  ];

  // Register hardened CORS policy
  await app.register(cors, {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400, // 24 hours preflight cache
  });

  // System Health Endpoint
  app.get('/health', async () => ({
    status: 'ok',
    service: 'studysync-api',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }));

  // Application Routes
  await app.register(userRoutes, { prefix: '/api/user' });
  await app.register(landingRoutes, { prefix: '/api/newsletter' });
  await app.register(liveRoutes, { prefix: '/api/live' });

  // Standardized 404 handler
  app.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({
      error: 'Not Found',
      message: `Route ${request.method} ${request.url} not found`,
      statusCode: 404,
    });
  });

  return app;
}
