const { TooManyRequests } = require("@feathersjs/errors");
const { RateLimiter } = require("limiter");

module.exports = function limitApiCall(
  options = {
    tokensPerInterval: 10,
    interval: "minute",
    method: "create",
  },
) {
  const limiter = new RateLimiter(options.tokensPerInterval, options.interval);

  return (context) => {
    if (context.type !== "before") {
      throw new Error(
        "The rate limiter was used in a hook other than 'before'",
      );
    }

    // check that we are rate limiting on right type of service method
    if (options.method && options.method !== context.method) {
      throw new Error(
        "options.method does not match the method in which this hook was registered",
      );
    }

    // check if hook was disabled for service. ONLY USE FOR TESTING
    // TODO add check to disable this in a production environment
    if (context.params.disableRateLimit) return context;

    if (!limiter.tryRemoveTokens(1)) {
      throw new TooManyRequests(
        "Too many requests in a given interval on service",
      );
    }

    return context;
  };
};
