/* eslint-disable quotes */
const knex = require('knex');
const expect = require('unexpected').clone().use(require('unexpected-knex'));
const app = require('../../src/app');

// For this test to work, knex has to be instanciated manually :(
const knexInstance = knex(app.get('postgres'));

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

describe('Migrations Tests', () => {
  before(async () => {
    // drop all tables in the migrations test
    await dropAllTables();
  });

  it('create the farms table', () => (
    expect(knexInstance, 'to apply migration', '20200524231606_init_farms.js')
      .then(() => (
        expect(knexInstance, 'to have table', 'farms')
          .and('to have columns', {
            farms: ['id', 'farm_name', 'title_number', 'size', 'created_at', 'updated_at'],
          })
      ))
  ));

  it('should create the users table', () => (
    expect(knexInstance, 'to apply migration', '20200525100152_init_users.js')
      .then(() => {
        const columns = ['id', 'email', 'password', 'first_name', 'last_name', 'role', 'active', 'created_at', 'updated_at'];
        return expect(knexInstance, 'to have table', 'users')
          .and('to have columns', { users: columns });
      })
  ));

  it('should create the staff table', () => (
    expect(knexInstance, 'to apply migration', '20200525103923_init_staff_table.js')
      .then(() => {
        const cols = ['id', 'email', 'phone_number', 'first_name', 'last_name', 'role', 'active', 'created_at', 'updated_at'];
        return expect(knexInstance, 'to have table', 'staff')
          .and('to have columns', { staff: cols });
      })
  ));

  it('should create the harvests table', () => (
    expect(knexInstance, 'to apply migration', '20200525184318_init_harvests_table.js')
      .then(() => {
        const cols = ['id', 'amount', 'harvesting_worker', 'clerk', 'harvest_farm', 'harvested_product', 'created_at', 'updated_at'];
        return expect(knexInstance, 'to have table', 'harvests')
          .and('to have columns', { harvests: cols });
      })
  ));

  it('should create the products table', () => (
    expect(knexInstance, 'to apply migration', '20200526225912_init_products.js')
      .then(() => {
        const cols = ['id', 'name', 'units', 'created_at', 'updated_at'];
        return expect(knexInstance, 'to have table', 'products')
          .and('to have columns', { products: cols });
      })
  ));

  it('should create the machines table', () => (
    expect(knexInstance, 'to apply migration', '20200715120748_init_machines_table_from_migrations_instead_of_model.js')
      .then(() => {
        const cols = ['id', 'text'];
        return expect(knexInstance, 'to have table', 'machines')
          .and('to have columns', { machines: cols });
      })
  ));

  it('should add the national_id field to the staff table', () => (
    expect(knexInstance, 'to apply migration', '20200720082513_add_id_field_to_staff.js')
      .then(() => expect(knexInstance, 'to have column', { staff: 'national_id' }))
  ));

  it('should drop the national_id column from the staff table', () => (
    expect(knexInstance, 'to apply migration', '20200722211850_drop_national_id_from_staff_table.js')
      .then(() => expect(knexInstance, 'not to have column', { staff: 'national_id' }))
  ));
});
