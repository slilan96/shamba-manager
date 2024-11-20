const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { MethodNotAllowed } = require("@feathersjs/errors");
const app = require("../../../../src/app");

chai.use(chaiAsPromised);
const { assert, expect } = chai;

describe("'machines' service", () => {
  it("registered the service", () => {
    const service = app.service("machines");

    assert.ok(service, "Registered the service");
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
});
