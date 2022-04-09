import { knex } from './db.js';

async function createTable() {
    try {
        const  exist = await knex.schema.hasTable('ecommerce');
        if (!exist) {
            await knex.schema.createTable('ecommerce', (table) => {
                table.increments('id').primary().notNullable(),
                table.string('title', 100),
                table.string('description', 500),
                table.float('price', 10, 2),
                table.integer('stock', 10),
                table.string('thumbnail', 250),
                table.timestamp('timestamp').defaultTo(knex.fn.now())
            });
            console.log('Tabla creada!!!');
        } else {
            console.log('La tabla ya existe');
        }
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
}

createTable();


