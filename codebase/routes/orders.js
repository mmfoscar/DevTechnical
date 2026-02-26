// POST /api/orders/sync
// Syncs order from CheckoutChamp; may be called multiple times per order.
// Body: { orderId, payload } or { orderId, payload, idempotencyKey }
function syncOrder(body, ctx) {
  const { orderId, payload } = body;
  const existing = ctx.store.orders.get(orderId);
  if (existing) {
    return { status: 200, data: existing };
  }
  const order = { id: orderId, ...payload, syncedAt: new Date().toISOString() };
  ctx.store.orders.set(orderId, order);
  ctx.warehouseCalls.push(order);
  return { status: 201, data: order };
}

module.exports = { syncOrder };