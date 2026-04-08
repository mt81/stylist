import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import health from './routes/health.js';
import users from './routes/users.js';

const app = new Hono();

app.use('*', logger());
app.use('*', cors());

app.route('/health', health);
app.route('/users', users);

export default app;
