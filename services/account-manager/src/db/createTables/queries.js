'use strict';

const knex = require('../index');

const loadDependencies = () => {
  knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
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

const clients = async () => {
  const tableName = 'clients';

  await knex.schema.createTable(tableName, (table) => {
    table
      .uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('tax_id').unique().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });

  await createTimestamp(tableName);
};

const accounts = async () => {
  const tableName = 'accounts';

  await knex.schema.createTable(tableName, (table) => {
    table
      .uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary();
    table.string('branch').notNullable();
    table.string('account_number').notNullable();
    table.uuid('client_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    table
      .foreign('client_id')
      .references('clients.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await createTimestamp(tableName);
};

const balances = async () => {
  const tableName = 'balances';

  await knex.schema.createTable(tableName, (table) => {
    table
      .uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .primary();
    table.double('reserved').notNullable();
    table.double('unreserved').notNullable();
    table.double('total').notNullable();
    table.uuid('account_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
    table
      .foreign('account_id')
      .references('accounts.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

  await createTimestamp(tableName);
};

module.exports = {
  loadDependencies,
  clients,
  accounts,
  balances,
};
