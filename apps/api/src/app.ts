import Fastify from 'fastify';
import cors from '@fastify/cors';

import health from './routes/health.js';
import users from './routes/users.js';

export async function buildApp() {
  const app = Fastify({ logger: false });

  await app.register(cors);
  await app.register(health, { prefix: '/health' });
  await app.register(users, { prefix: '/users' });

  return app;
}
