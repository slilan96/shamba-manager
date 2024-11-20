const { Service } = require("feathers-objection");

class Users extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model,
    });
  }
}

Users.prototype.docs = {
  description:
    "A service to track of registered users in the system, whether active/inactive",
  definitions: {
    users: {
      type: "object",
      required: ["email", "password", "first_name", "last_name", "role"],
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
        password: {
          type: "string",
          description: "The password to use for logins",
        },
        role: {
          type: "string",
          enum: ["administrator", "supervisor", "farm-worker"],
          description:
            "The role for the user. This controls the type of operations available to the user",
        },
      },
    },
  },
};

exports.Users = Users;
