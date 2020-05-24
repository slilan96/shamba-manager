const { Service } = require('feathers-objection');

exports.Farms = class Farms extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
