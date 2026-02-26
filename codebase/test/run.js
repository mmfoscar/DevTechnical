/**
 * Run tests against the orders and funnel routes.
 * Uses a fresh store and warehouseCalls for each test.
 */
function freshCtx() {
  return {
    store: {
      orders: new Map(),
      funnelEvents: [],
      idempotency: new Map(),
    },
    warehouseCalls: [],
  };
}

function assert(condition, message) {
  if (!condition) throw new Error('Assertion failed: ' + message);
}

function test(name, fn) {
  try {
    fn();
    console.log('  ✓ ' + name);
  } catch (e) {
    console.error('  ✗ ' + name + '\n    ' + e.message);
    process.exitCode = 1;
  }
}

const { syncOrder } = require('../routes/orders');
const { recordFunnelStep } = require('../routes/funnel');

console.log('\nOrders API\n');

test('sync with missing orderId returns 400', () => {
  const ctx = freshCtx();
  const result = syncOrder({ payload: {} }, ctx);
  assert(result.status === 400, 'expected status 400, got ' + result.status);
});

test('sync creates order and calls warehouse once', () => {
  const ctx = freshCtx();
  const r = syncOrder({ orderId: 'ord-1', payload: { amount: 100 } }, ctx);
  assert(r.status === 201, 'expected 201, got ' + r.status);
  assert(ctx.warehouseCalls.length === 1, 'warehouse should be called once');
  assert(ctx.warehouseCalls[0].id === 'ord-1', 'warehouse received wrong order');
});

test('sync with same orderId again does not call warehouse twice', () => {
  const ctx = freshCtx();
  syncOrder({ orderId: 'ord-2', payload: {} }, ctx);
  const r2 = syncOrder({ orderId: 'ord-2', payload: {} }, ctx);
  assert(r2.status === 200, 'expected 200 on duplicate, got ' + r2.status);
  assert(ctx.warehouseCalls.length === 1, 'warehouse should still be called once');
});

test('sync with same idempotencyKey twice (e.g. retry with same key) returns same result and calls warehouse once', () => {
  const ctx = freshCtx();
  const r1 = syncOrder({
    orderId: 'ord-3',
    payload: { amount: 50 },
    idempotencyKey: 'idem-key-1',
  }, ctx);
  assert(r1.status === 201, 'first request should be 201');
  // Retry: same idempotency key, possibly duplicate orderId or client sent same key again
  const r2 = syncOrder({
    orderId: 'ord-3',
    payload: { amount: 50 },
    idempotencyKey: 'idem-key-1',
  }, ctx);
  assert(r2.status === 200, 'second request with same key should be 200');
  assert(ctx.warehouseCalls.length === 1, 'warehouse must be called only once for same idempotency key');
  assert(r2.data.id === 'ord-3', 'second response should return same order');
});

test('sync with same idempotencyKey but different orderId (client bug/retry) still returns cached response and no second warehouse call', () => {
  const ctx = freshCtx();
  syncOrder({ orderId: 'ord-3b', payload: {}, idempotencyKey: 'idem-key-2' }, ctx);
  const r2 = syncOrder({ orderId: 'ord-3b-different', payload: {}, idempotencyKey: 'idem-key-2' }, ctx);
  assert(ctx.warehouseCalls.length === 1, 'same idempotency key must not trigger second warehouse call');
  assert(r2.data.id === 'ord-3b', 'must return the same result as first request for that key');
});

test('sync with different idempotencyKey for same orderId creates one order but we allow both to succeed (no duplicate export)', () => {
  const ctx = freshCtx();
  syncOrder({ orderId: 'ord-4', payload: {}, idempotencyKey: 'key-A' }, ctx);
  const r2 = syncOrder({ orderId: 'ord-4', payload: {}, idempotencyKey: 'key-B' }, ctx);
  assert(ctx.warehouseCalls.length === 1, 'same orderId should only export once');
  assert(r2.status === 200, 'second request returns existing order');
});

console.log('\nFunnel API\n');

test('recordFunnelStep stores event', () => {
  const ctx = freshCtx();
  const r = recordFunnelStep({
    clickId: 'click-1',
    stepKey: 'checkout',
    payload: { value: 1 },
  }, ctx);
  assert(r.status === 200, 'expected 200');
  assert(ctx.store.funnelEvents.length === 1, 'one event stored');
  assert(ctx.store.funnelEvents[0].click_id === 'click-1', 'click_id stored');
  assert(ctx.store.funnelEvents[0].step === 'checkout', 'step stored');
});

console.log('\nDone.\n');