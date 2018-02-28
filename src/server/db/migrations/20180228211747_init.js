
exports.up = function(knex, Promise) {
  return knex.schema

  .createTable('global_programs', (table) => {
    table.increments('id');
    table.enu('type', ['movie', 'series']).notNullable();
    table.boolean('featured').defaultTo(false)
    table.json('tags');
    table.string('image_url')
    table.timestamps(true, true);
  })

  .createTable('channels', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.boolean('is_default').defaultTo(false);
    table.timestamps(true, true);
  })
  
  .createTable('programs', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('image_url');
    table.integer('global_program').notNullable().references('global_programs.id').onDelete('CASCADE');
    table.text('description');
    table.unique(['global_program'])
    table.timestamps(true, true);
  })

  .createTable('channels_programs', (table) => {
    table.increments('id');
    table.integer('channel').notNullable().references('channels.id').onDelete('CASCADE');
    table.integer('program').notNullable().references('programs.id').onDelete('CASCADE');
    table.unique(['channel', 'program']);
    table.timestamps(true, true);
  })

  .createTable('episodes', (table) => {
    table.increments('id');
    table.integer('season').notNullable();
    table.integer('episode_number').notNullable();
    table.integer('program').references('programs.id').notNullable();
    table.timestamps(true, true);
  })

  .createTable('feed', (table) => {
    table.increments('id');
    table.dateTime('start_time').notNullable();
    table.dateTime('end_time').notNullable();
    table.integer('channel').references('channels.id').notNullable();
    table.integer('program').references('programs.id').notNullable();
    table.timestamps(true, true);
  })

  .createTable('locales', (table) => {
    table.increments('id');
    table.string('country').notNullable();
    table.string('language').notNullable();
    table.timestamps(true, true);
  })

  .createTable('locales_channels', (table) => {
    table.increments('id');
    table.integer('locale').references('locales.id').notNullable().onDelete('CASCADE');;
    table.integer('channel').references('channels.id').notNullable().onDelete('CASCADE');;
    table.timestamps(true, true);
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('channels_programs')
  .dropTableIfExists('locales_channels')
  .dropTableIfExists('feed')
  .dropTableIfExists('locales')
  .dropTableIfExists('channels')
  .dropTableIfExists('episodes')
  .dropTableIfExists('programs')
  .dropTableIfExists('global_programs')
};