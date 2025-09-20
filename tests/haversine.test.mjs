import test from 'node:test';
import assert from 'node:assert/strict';
import { haversineDistance } from '../themes/aurora-dark/assets/js/modules/map.js';

test('haversine distance returns zero for identical points', () => {
  const origin = { lat: 53.55, lng: 9.99 };
  assert.equal(haversineDistance(origin, origin), 0);
});

test('haversine distance matches known distance within tolerance', () => {
  const hamburg = { lat: 53.5511, lng: 9.9937 };
  const berlin = { lat: 52.5200, lng: 13.4050 };
  const distance = haversineDistance(hamburg, berlin);
  assert.ok(Math.abs(distance - 255) < 1, `expected distance close to 255km, got ${distance}`);
});
