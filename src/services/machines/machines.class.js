const { Service } = require('feathers-objection');

exports.Machines = class Machines extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
};
