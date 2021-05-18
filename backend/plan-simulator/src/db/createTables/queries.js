const knex = require('../index');

const loadDependencies = () => {
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
};

const createTimestamp = async (table) => {
  await knex.raw(`CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`);

  await knex.raw(`CREATE TRIGGER set_timestamp
BEFORE UPDATE ON ${table}
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();`);
};

const features = async () => {
  const tableName = 'features';

  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    await knex.schema.createTable(tableName, (table) => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary();
      table.string('name').notNullable();
      table.double('price').notNullable();
      table.string('price_type');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });

    await createTimestamp(tableName);
  }
};

const plans = async () => {
  const tableName = 'plans';

  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    await knex.schema.createTable(tableName, (table) => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary();
      table.string('name').notNullable();
      table.double('price').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });

    await createTimestamp(tableName);
  }
};

const plansFeatures = async () => {
  const tableName = 'plans_features';

  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    await knex.schema.createTable(tableName, (table) => {
      table
        .uuid('id')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable()
        .primary();
      table.integer('quantity');
      table.uuid('feature_id').notNullable();
      table.uuid('plan_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
      table
        .foreign('feature_id')
        .references('features.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .foreign('plan_id')
        .references('plans.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });

    await createTimestamp(tableName);
  }
};

module.exports = {
  loadDependencies,
  plans,
  plansFeatures,
  features,
};
