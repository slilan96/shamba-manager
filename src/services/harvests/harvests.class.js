const { Service } = require('feathers-objection');

exports.Harvests = class Harvests extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
