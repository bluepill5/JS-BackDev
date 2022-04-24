import { knex } from '../database/db.js';

class Product {
    // Methods
    save = async (newProduct) => {
        try {
            await knex.insert(newProduct).from('ecommerce');
        } catch (error) {
            console.log(error);
        }
    }

    updateById = async (id, prodUpdate) => {
        try {
            await knex.update(prodUpdate).from('ecommerce').where('id', id);
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        try {
            const product = await knex.select().from('ecommerce').where('id', id);
            return product[0];
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async () => {
        try {
            const products = await knex.select().from('ecommerce');
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    deleteById = async (id) => {
        try {
            await knex.del().from('ecommerce').where('id', id);
        } catch (error) {
            console.log(error);
        }
    }

    deleteAll = async () => {
        try {
            await knex.del().from('ecommerce');
            return [];
        } catch (error) {
            console.log(error);
        }
    }
}

export default Product;

