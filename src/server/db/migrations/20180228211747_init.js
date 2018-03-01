
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
    table.string('locale').notNullable();
    table.boolean('is_default').defaultTo(false);
    table.timestamps(true, true);
  })
  
  .createTable('programs', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('image_url');
    table.integer('global_program_id').notNullable().references('global_programs.id').onDelete('CASCADE');
    table.text('description');
    table.unique(['global_program_id'])
    table.timestamps(true, true);
  })

  .createTable('channels_programs', (table) => {
    table.increments('id');
    table.integer('channel_id').notNullable().references('channels.id').onDelete('CASCADE');
    table.integer('program_id').notNullable().references('programs.id').onDelete('CASCADE');
    table.timestamps(true, true);
  })
 
  .createTable('episodes', (table) => {
    table.increments('id');
    table.integer('season');
    table.integer('episode_number');
    table.text('description');
    table.integer('program_id').references('programs.id').notNullable();
    table.timestamps(true, true);
  })

  .createTable('feed', (table) => {
    table.increments('id');
    table.dateTime('start_time').notNullable();
    table.dateTime('end_time').notNullable();
    table.integer('channel_id').references('channels.id').notNullable();
    table.integer('episode_id').references('episodes.id').notNullable();
    table.timestamps(true, true);
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('channels_programs')
  .dropTableIfExists('feed')
  .dropTableIfExists('channels')
  .dropTableIfExists('episodes')
  .dropTableIfExists('programs')
  .dropTableIfExists('global_programs')
};