const { Service } = require("feathers-objection");

class Staff extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
}

Staff.prototype.docs = {
  description:
    "A service to keep track of the Staff that have been employed on the farm",
  definitions: {
    users: {
      type: "object",
      required: ["email", "first_name", "last_name", "role"],
      properties: {
        email: {
          type: "string",
          description: "The email of the user",
        },
        first_name: {
          type: "string",
          description: "The first name of the user",
        },
        last_name: {
          type: "string",
          description: "The last name of the user",
        },
        role: {
          type: "string",
          enum: ["supervisor", "farm-worker", "foreman"],
          description:
            "The role for the staff. This represents their actual role in the farm",
        },
      },
    },
  },
};

exports.Staff = Staff;
