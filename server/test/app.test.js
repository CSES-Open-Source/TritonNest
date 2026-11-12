import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';

process.env.NODE_ENV = 'test';
const app = createApp();

test('GET /api/health returns ok', async () => {
  const res = await request(app).get('/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('protected routes reject requests without a token', async () => {
  const res = await request(app).get('/api/listings');
  assert.equal(res.status, 401);
});

test('unknown routes return 404', async () => {
  const res = await request(app).get('/api/nope');
  assert.equal(res.status, 404);
});
