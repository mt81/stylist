import type { FastifyPluginAsync } from 'fastify';
import type { ApiResponse, User } from '@stylist/shared';

const users: FastifyPluginAsync = async (app) => {
  app.get<{ Params: { id: string } }>('/:id', async (request) => {
    const { id } = request.params;

    const stub: User = {
      id,
      email: 'stub@example.com',
      role: 'user',
      createdAt: new Date(),
    };

    const response: ApiResponse<User> = { data: stub };
    return response;
  });
};

export default users;
