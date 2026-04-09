import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '..');

describe('docker-compose.yml', () => {
  const composePath = resolve(root, 'docker-compose.yml');

  it('exists at the repo root', () => {
    expect(existsSync(composePath)).toBe(true);
  });

  it('defines a PostgreSQL 15 service', () => {
    const content = readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/postgres:15/);
  });

  it('defines an api service', () => {
    const content = readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/^\s*api:/m);
  });

  it('configures hot reload via ts-node-dev for the api service', () => {
    const content = readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/ts-node-dev/);
  });

  it('mounts a volume into the api service for hot reload', () => {
    const content = readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/volumes:/);
    // src should be bind-mounted so file changes are reflected
    expect(content).toMatch(/\.\/?:?\/?.*\/app/);
  });

  it('exposes the API port', () => {
    const content = readFileSync(composePath, 'utf-8');
    expect(content).toMatch(/ports:/);
  });
});

describe('.env.local.example', () => {
  const envPath = resolve(root, '.env.local.example');

  it('exists at the repo root', () => {
    expect(existsSync(envPath)).toBe(true);
  });

  it('contains DB_HOST', () => {
    const content = readFileSync(envPath, 'utf-8');
    expect(content).toMatch(/^DB_HOST=/m);
  });

  it('contains DB_PORT', () => {
    const content = readFileSync(envPath, 'utf-8');
    expect(content).toMatch(/^DB_PORT=/m);
  });

  it('contains DB_USER', () => {
    const content = readFileSync(envPath, 'utf-8');
    expect(content).toMatch(/^DB_USER=/m);
  });

  it('contains DB_PASSWORD', () => {
    const content = readFileSync(envPath, 'utf-8');
    expect(content).toMatch(/^DB_PASSWORD=/m);
  });

  it('contains DB_NAME', () => {
    const content = readFileSync(envPath, 'utf-8');
    expect(content).toMatch(/^DB_NAME=/m);
  });
});

describe('README.md', () => {
  const readmePath = resolve(root, 'README.md');

  it('exists', () => {
    expect(existsSync(readmePath)).toBe(true);
  });

  it('includes a local setup / development section', () => {
    const content = readFileSync(readmePath, 'utf-8');
    expect(content).toMatch(/local.*(setup|dev|development)|getting.started/i);
  });

  it('mentions docker compose up', () => {
    const content = readFileSync(readmePath, 'utf-8');
    expect(content).toMatch(/docker[\s-]compose up/i);
  });
});
