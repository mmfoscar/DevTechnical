const http = require('http');
const { handleRequest } = require('./routes');

const store = { orders: new Map(), funnelEvents: [], idempotency: new Map() };
const warehouseCalls = [];

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    try {
      const parsed = body ? JSON.parse(body) : {};
      handleRequest(req, res, parsed, { store, warehouseCalls });
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Listening on', port));

module.exports = { server, store: () => store, warehouseCalls: () => warehouseCalls };
