/* eslint-disable quotes */
const knex = require("knex");
const expect = require("unexpected").clone().use(require("unexpected-knex"));
const app = require("../../src/app");

// For this test to work, knex has to be instantiated manually :(
const knexInstance = knex(app.get("postgres"));

async function dropAllTables() {
  await knexInstance.raw(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;

    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname='public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);
}

describe("Migrations Tests", () => {
  before(async () => {
    // drop all tables in the migrations test
    await dropAllTables();
  });

  describe("Creating the 'farms' table", () => {
    it("should create the farms table", () => expect(
      knexInstance,
      "to apply migration",
      "20200524231606_init_farms.js",
    ).then(() => expect(knexInstance, "to have table", "farms").and("to have columns", {
      farms: [
        "id",
        "farm_name",
        "title_number",
        "size",
        "created_at",
        "updated_at",
      ],
    })));
  });

  describe("Creating the 'users' table", () => {
    it("should create the users table", () => expect(
      knexInstance,
      "to apply migration",
      "20200525100152_init_users.js",
    ).then(() => {
      const columns = [
        "id",
        "email",
        "password",
        "first_name",
        "last_name",
        "role",
        "active",
        "created_at",
        "updated_at",
      ];
      return expect(knexInstance, "to have table", "users").and(
        "to have columns",
        { users: columns },
      );
    }));
  });

  describe("Creating the 'staff' table", () => {
    it("should create the staff table", () => expect(
      knexInstance,
      "to apply migration",
      "20200525103923_init_staff_table.js",
    ).then(() => {
      const cols = [
        "id",
        "email",
        "phone_number",
        "first_name",
        "last_name",
        "role",
        "active",
        "created_at",
        "updated_at",
      ];
      return expect(knexInstance, "to have table", "staff").and(
        "to have columns",
        { staff: cols },
      );
    }));
  });

  describe("Creating the 'harvests' table", () => {
    it("should create the harvests table", () => expect(
      knexInstance,
      "to apply migration",
      "20200525184318_init_harvests_table.js",
    ).then(() => {
      const cols = [
        "id",
        "amount",
        "harvesting_worker",
        "clerk",
        "harvest_farm",
        "harvested_product",
        "created_at",
        "updated_at",
      ];
      return expect(knexInstance, "to have table", "harvests").and(
        "to have columns",
        { harvests: cols },
      );
    }));
  });

  describe("Creating the 'products' table", () => {
    it("should create the products table", () => expect(
      knexInstance,
      "to apply migration",
      "20200526225912_init_products.js",
    ).then(() => {
      const cols = ["id", "name", "units", "created_at", "updated_at"];
      return expect(knexInstance, "to have table", "products").and(
        "to have columns",
        { products: cols },
      );
    }));
  });

  describe("Creating the 'machines' table", () => {
    it("should create the machines table", () => expect(
      knexInstance,
      "to apply migration",
      "20200715120748_init_machines_table_from_migrations_instead_of_model.js",
    ).then(() => {
      const cols = ["id", "text"];
      return expect(knexInstance, "to have table", "machines").and(
        "to have columns",
        { machines: cols },
      );
    }));
  });

  describe("Adding 'national_id' column to staff table", () => {
    it("should add the national_id field to the staff table", () => expect(
      knexInstance,
      "to apply migration",
      "20200720082513_add_id_field_to_staff.js",
    ).then(() => expect(knexInstance, "to have column", { staff: "national_id" })));
  });

  describe("Dropping 'national_id' column from staff table", () => {
    it("should drop the national_id column from the staff table", () => expect(
      knexInstance,
      "to apply migration",
      "20200722211850_drop_national_id_from_staff_table.js",
    ).then(() => expect(knexInstance, "not to have column", { staff: "national_id" })));
  });

  describe("Adding 'date_of_harvest' column to harvests table", () => {
    it("should add a date_of_harvest_column to the harvests table", () => expect(
      knexInstance,
      "to apply migration",
      "20200806143339_add_date_of_harvest_column_to_harvest_table.js",
    ).then(() => expect(knexInstance, "to have column", { harvests: "date_of_harvest" })));
  });

  describe("Creating the 'projects' table", () => {
    it("should create a projects table", () => expect(
      knexInstance,
      "to apply migration",
      "20200831174024_create_projects_table.js",
    ).then(() => {
      const cols = ["id", "project_name"];
      return expect(knexInstance, "to have table", "projects").and(
        "to have columns",
        { projects: cols },
      );
    }));
  });

  describe("Adding 'project_id' field to harvests table", () => {
    it("should add the project_id field to the harvests table", () => expect(
      knexInstance,
      "to apply migration",
      "20200831175536_add_project_id_to_harvest_table.js",
    ).then(() => expect(knexInstance, "to have column", { harvests: "project_id" })));
  });

  describe("Dropping the 'projects' table", () => {
    it("should drop the projects table", () => expect(
      knexInstance,
      "to apply migration",
      "20210322095201_drop_projects_table.js",
    ).then(() => expect(knexInstance, "not to have table", "projects")));
  });

  describe("Dropping project_id column from harvests table", () => {
    it("should drop the project_id column from the harvests table", () => expect(
      knexInstance,
      "to apply migration",
      "20210322100221_drop_project_id_column_from_harvest_table.js",
    ).then(() => expect(knexInstance, "not to have column", { harvests: "project_id" })));
  });
});
