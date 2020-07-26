const assert = require('assert').strict;
const axios = require('axios');
const url = require('url');
const app = require('../../src/app');

const port = app.get('port') || 8998;
const getUrl = (pathname) => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname,
});

describe('Feathers application tests', () => {
  let server;

  before((done) => {
    server = app.listen(port);
    server.once('listening', () => done());
  });

  after((done) => {
    server.close(done);
  });

  describe('404', () => {
    it('shows a 404 JSON error without stack trace', async () => {
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          json: true,
        });
        assert.fail('should never get here');
      } catch (error) {
        const { response } = error;

        assert.equal(response.status, 404);
        assert.equal(response.data.code, 404);
        assert.equal(response.data.message, 'Page not found');
        assert.equal(response.data.name, 'NotFound');
      }
    });
  });
});
