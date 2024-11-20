const { Service } = require("feathers-objection");

class Harvests extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
}

Harvests.prototype.docs = {
  description:
    "A service to keep add and keep track of harvest/harvest like operations in your farm",
  definitions: {
    harvests: {
      type: "object",
      required: [
        "amount",
        "harvesting_worker",
        "clerk",
        "harvest_farm",
        "harvested_product",
      ],
      properties: {
        amount: {
          type: "number",
          description:
            "This is the amount of produce. This field is units agnostic.",
        },
        harvesting_worker: {
          type: "string",
          description:
            "The id of the person who the harvest amount is attributed to",
        },
        clerk: {
          type: "string",
          description: "The id of the employee who records the amounts",
        },
        harvest_farm: {
          type: "string",
          description: "The id of the farm where the harvest took place",
        },
        harvested_product: {
          type: "string",
          description: "The id of the product involved in the harvest",
        },
      },
    },
  },
};

exports.Harvests = Harvests;
