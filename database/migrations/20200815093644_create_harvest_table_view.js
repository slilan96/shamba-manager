exports.up = function createHarvestTableView(knex) {
  return knex.raw(`
    CREATE VIEW harvests_master_data AS (
      SELECT 
        harvests.created_at, harvests.date_of_harvest::DATE as date_of_harvest, harvests.amount,
        concat(clerks.first_name, ' ', clerks.last_name) as clerk_name, 
        concat(harvesting_workers.first_name, ' ', harvesting_workers.last_name) as harvest_worker_name,
        farms.farm_name,
        products.name
      FROM harvests
      INNER JOIN staff as clerks ON harvests.clerk = clerks.id::varchar
      INNER JOIN staff as harvesting_workers ON harvests.harvesting_worker = harvesting_workers.id::varchar
      INNER JOIN products ON harvests.harvested_product = products.id::varchar
      INNER JOIN farms ON harvests.harvest_farm = farms.id::varchar
    )
  `);
};

exports.down = function dropHarvestTableView(knex) {
  return knex.raw('DROP VIEW harvests_master_data');
};
