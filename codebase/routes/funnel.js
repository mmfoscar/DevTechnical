// POST /api/funnel/step
// Records a funnel step for our client dashboard. May be called multiple times for the same step.
function recordFunnelStep(body, ctx) {
  const { clickId, stepKey, payload = {} } = body;
  const row = {
    click_id: clickId,
    step: stepKey,
    raw: JSON.stringify(payload),
    created_at: new Date().toISOString(),
  };
  ctx.store.funnelEvents.push(row);
  return { status: 200, data: { ok: true } };
}

module.exports = { recordFunnelStep };