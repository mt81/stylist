import { Hono } from 'hono';
import type { ApiResponse, User } from '@stylist/shared';

const users = new Hono();

users.get('/:id', (c) => {
  const id = c.req.param('id');

  const stub: User = {
    id,
    email: 'stub@example.com',
    role: 'user',
    createdAt: new Date(),
  };

  const response: ApiResponse<User> = { data: stub };
  return c.json(response);
});

export default users;
