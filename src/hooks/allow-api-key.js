// eslint-disable-next-line no-unused-vars
module.exports = function allowApiKey(options = {}) {
  return async (context) => {
    const { params } = context;

    if (
      params.provider
      && !params.authentication
      && params.headers
      && params.headers['x-api-key']
    ) {
      context.params = {
        ...params,
        authentication: {
          strategy: 'apiKey',
          apiKey: params.headers['x-api-key'],
        },
      };
    }
    return context;
  };
};
