import type { FastifyPluginAsync } from 'fastify';

const health: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return { status: 'ok', ts: new Date().toISOString() };
  });
};

export default health;
