import { buildApp } from './app.js';
import { env } from './config/env.js';

const app = await buildApp();

let isShuttingDown = false;

const gracefulShutdown = async (signal: string) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  app.log.info(`Received ${signal}. Initiating graceful shutdown...`);

  // Force exit safeguard if active connections do not close within 10 seconds
  const forceExitTimer = setTimeout(() => {
    app.log.error('Graceful shutdown timed out after 10 seconds. Forcing termination.');
    process.exit(1);
  }, 10000);
  forceExitTimer.unref();

  try {
    await app.close();
    app.log.info('Fastify server closed all connections successfully.');
    process.exit(0);
  } catch (err) {
    app.log.error(err, 'Error encountered while closing Fastify server.');
    process.exit(1);
  }
};

// Process lifecycle event listeners (Container deployments send SIGTERM)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Process error listeners to prevent silent crashes
process.on('uncaughtException', (error) => {
  app.log.fatal(error, 'Uncaught Exception detected');
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  app.log.fatal(reason, 'Unhandled Rejection detected');
  gracefulShutdown('unhandledRejection');
});

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' });
  app.log.info(`🚀 StudySync API Server listening on port ${env.PORT} [${env.NODE_ENV}]`);
} catch (error) {
  app.log.error(error, 'Failed to start StudySync server');
  process.exit(1);
}
