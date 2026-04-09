import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../app.js';

describe('GET /health', () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 with status ok', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: 'ok' });
  });

  it('includes a ts timestamp', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' });

    expect(res.json()).toHaveProperty('ts');
    expect(new Date(res.json().ts as string).getTime()).not.toBeNaN();
  });
});
