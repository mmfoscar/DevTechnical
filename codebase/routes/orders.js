// POST /api/orders/sync
// Syncs order from CheckoutChamp; may be called multiple times per order.
// Body: { orderId, payload } or { orderId, payload, idempotencyKey }
function syncOrder(body, ctx) {
  const { orderId, payload, idempotencyKey } = body;

  if (!orderId) {
    return { status: 400, error: 'orderId is required' };
  }
  if (!payload) {
    return { status: 400, error: 'payload is required' };
  }

  if (idempotencyKey) {
    const cachedResult = ctx.store.idempotency.get(idempotencyKey);
    if (cachedResult) {
      return { status: 200, data: cachedResult.data };
    }
  }

  const existing = ctx.store.orders.get(orderId);
  if (existing) {
    const response = { status: 200, data: existing };
    if (idempotencyKey) {
      ctx.store.idempotency.set(idempotencyKey, response);
    }
    return response;
  }

  const order = { id: orderId, ...payload, syncedAt: new Date().toISOString() };
  ctx.store.orders.set(orderId, order);
  ctx.warehouseCalls.push(order);

  const response = { status: 201, data: order };

  if (idempotencyKey) {
    ctx.store.idempotency.set(idempotencyKey, response);
  }

  return response;
}

module.exports = { syncOrder };