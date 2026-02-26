const { syncOrder } = require('./orders');
const { recordFunnelStep } = require('./funnel');

function handleRequest(req, res, body, ctx) {
  const url = req.url;
  const method = req.method;

  if (method === 'POST' && url === '/api/orders/sync') {
    const result = syncOrder(body, ctx);
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.data));
    return;
  }

  if (method === 'POST' && url === '/api/funnel/step') {
    const result = recordFunnelStep(body, ctx);
    res.writeHead(result.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result.data));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

module.exports = { handleRequest };