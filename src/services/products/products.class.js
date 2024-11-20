const { Service } = require("feathers-objection");

class Products extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
}

Products.prototype.docs = {
  description:
    "A service to keep track of the products harvested/produced in the farm e.g maize, coffee cherries etc",
  definitions: {
    products: {
      type: "object",
      required: ["name", "units"],
      properties: {
        name: {
          type: "string",
          description: "The name of the product",
        },
        units: {
          type: "string",
          description: "The units of measurement of the product e.g Kgs",
        },
      },
    },
  },
};

exports.Products = Products;
