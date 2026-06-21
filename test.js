const assert = require('assert');
const http = require('http');
const { server } = require('./index');

server.listen(0, () => {
  const { port } = server.address();

  http.get(`http://localhost:${port}`, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const body = JSON.parse(data);

      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(body.message, 'Hello from Jenkin-Demo!');
      assert.strictEqual(body.status, 'running');

      console.log('All tests passed!');
      server.close();
      process.exit(0);
    });
  });
});
