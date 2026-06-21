const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'Hello from Jenkin-Demo!',
      status: 'running',
      timestamp: new Date().toISOString(),
    })
  );
});

function startServer(port = PORT) {
  return server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };
