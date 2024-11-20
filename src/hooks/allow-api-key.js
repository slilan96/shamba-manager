module.exports = function allowApiKey(options = {}) {
  // eslint-disable-line no-unused-vars
  return async (context) => {
    const { params } = context;

    if (
      params.provider &&
      !params.authentication &&
      params.headers &&
      params.headers["x-api-key"]
    ) {
      context.params = {
        ...params,
        authentication: {
          strategy: "apiKey",
          apiKey: params.headers["x-api-key"],
        },
      };
    }
    return context;
  };
};
