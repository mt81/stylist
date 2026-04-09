import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { ApiResponse, User } from '@stylist/shared';
import { buildApp } from '../app.js';

describe('GET /users/:id', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 with the requested user id', async () => {
    const res = await app.inject({ method: 'GET', url: '/users/abc-123' });

    expect(res.statusCode).toBe(200);
    const body = res.json<ApiResponse<User>>();
    expect(body.data.id).toBe('abc-123');
  });

  it('returns the expected user shape', async () => {
    const res = await app.inject({ method: 'GET', url: '/users/xyz' });

    const body = res.json<ApiResponse<User>>();
    expect(body.data).toMatchObject({
      id: 'xyz',
      email: expect.any(String),
      role: expect.any(String),
    });
  });
});
