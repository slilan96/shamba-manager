const feathers = require('@feathersjs/feathers');
const { TooManyRequests } = require('@feathersjs/errors');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const rateLimit = require('../../../../src/hooks/rate-limiter');

chai.use(chaiAsPromised);
const { assert } = chai;

describe('Rate Limiter Hook', () => {
  let app;
  beforeEach(() => {
    // arrange
    app = feathers();
    app.use('/test', { async create(data) { return data; } });
  });

  it('should allow a request if it is within the limit', () => {
    // arrange
    app.service('test').hooks({
      before: {
        create: rateLimit(),
      },
    });

    // act and assert
    return assert.isFulfilled(app.service('test').create({ name: 'good' }));
  });

  it('should throw an error if too many requests are sent to the same endpoint', () => {
    // arrange
    app.service('test').hooks({
      before: {
        create: rateLimit({ tokensPerInterval: 5, interval: 60 * 1000 }),
      },
    });

    const testArr = [];
    for (let i = 0; i < 10; i += 1) {
      testArr.push(app.service('test').create({ name: 'bad creation' }));
    }

    // act and assert
    return assert.isRejected(Promise.all(testArr), TooManyRequests);
  });

  it('should throw an error if the hook is registered in any type other than before', () => {
    // arrange
    app.service('test').hooks({
      after: { create: rateLimit() },
    });

    // act and assert
    return assert.isRejected(app.service('test').create({ name: 'bad creation' }), Error);
  });

  it('should throw an error if the hook\'s options.method does not match the assigned method', () => {
    // arrange
    app.service('test').hooks({
      before: { create: rateLimit({ method: 'find', tokensPerInterval: 5, interval: 'hour' }) },
    });

    // act and assert
    return assert.isRejected(app.service('test').create({ name: 'bad creation' }), Error);
  });
});
