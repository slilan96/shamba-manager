const { Service } = require('feathers-objection');

class Farms extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
}

Farms.prototype.docs = {
  description: 'A service to store the farms to used in this side',
  definitions: {
    farms: {
      type: 'object',
      required: ['farm_name'],
      properties: {
        farm_name: {
          type: 'string',
          description: 'The name of the farm',
        },
        title_number: {
          type: 'string',
          description:
            'The Title Number of the farm for official record keeping',
        },
      },
    },
  },
};

exports.Farms = Farms;
