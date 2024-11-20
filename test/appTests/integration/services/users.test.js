const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { faker } = require("@faker-js/faker");
const { NotAuthenticated, MethodNotAllowed } = require("@feathersjs/errors");
const _ = require("lodash");
const app = require("../../../../src/app");

chai.use(chaiAsPromised);
const { expect, assert } = chai;

describe("'users' service", () => {
  afterEach(async () => {
    const knex = app.get("knex");
    await knex("users").truncate();
  });

  it("registered the service", () => {
    const service = app.service("users");

    assert.ok(service, "Registered the service");
  });

  describe("POST creating a user", () => {
    let validUserInfo;
    beforeEach(() => {
      // given
      validUserInfo = {
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        password: faker.internet.password(),
        role: faker.random.arrayElement(["administrator", "supervisor"]),
      };
    });

    it("should create a user when supplied with an api key for an HTTP request", async () => {
      // when
      const response = await app.service("users").create(validUserInfo, {
        headers: { "x-api-key": app.get("apiKey") },
        provider: "rest",
      });

      // then
      expect(response).to.include(_.omit(validUserInfo, "password"));
    });

    it("should register a user when presented with valid input", async () => {
      // given
      const response = await app.service("users").create(validUserInfo);

      // then
      expect(response).to.include(_.omit(validUserInfo, "password"));
    });

    it("should reject user creation if one of the required fields is missing", async () => {
      // given
      const requiredFields = [
        "email",
        "first_name",
        "last_name",
        "password",
        "role",
      ];
      const ommittedField = faker.random.arrayElement(requiredFields);

      // when
      const response = app
        .service("users")
        .create(_.omit(validUserInfo, ommittedField), { authenticated: true });

      // then
      await expect(response).to.be.rejected;
    });

    it("should not return password field to the user after creation for an external request", async () => {
      // when
      const response = await app
        .service("users")
        .create(validUserInfo, { provider: "external", authenticated: true });

      // then
      expect(response).to.not.have.property("password");
    });

    it("should reject user creation from an unauthenticated external request", async () => {
      // when
      const response = app
        .service("users")
        .create(validUserInfo, {
          disableRateLimit: true,
          provider: "external",
        });

      // then
      await expect(response).to.be.rejectedWith(NotAuthenticated);
    });

    // TODO reject user creation if email already exists
  });

  describe("PUT updating/replacing a user", () => {
    it("should reject internal PUT requests", async () => {
      // when
      const response = app.service("users").update("fake-id", {});

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it("should reject external PUT requests", async () => {
      // when
      const response = app
        .service("users")
        .update("fake_id", {}, { provider: "external" });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
  // should put extra thought into what deleting a user actually means
});
