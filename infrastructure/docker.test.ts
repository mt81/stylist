import { describe, it, expect, afterAll } from 'vitest';
import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? 'stylist',
  password: process.env.DB_PASSWORD ?? 'stylist',
  database: process.env.DB_NAME ?? 'stylist',
});

describe('PostgreSQL (via Docker)', () => {
  afterAll(async () => {
    await client.end().catch(() => {});
  });

  it('accepts a connection', async () => {
    await expect(client.connect()).resolves.toBeUndefined();
  });

  it('responds to a basic query', async () => {
    const result = await client.query('SELECT 1 AS value');
    expect(result.rows[0].value).toBe(1);
  });
});
