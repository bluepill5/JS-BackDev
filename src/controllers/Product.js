import '../config/db.js';
import { ObjectId } from 'mongodb';
import { ProductModel } from '../modules/products_modules.js';

class Product {
    // Methods
    save = async (newProduct) => {
        try {
            await ProductModel.create(newProduct);
        } catch (error) {
            console.log(error);
        }
    }
    updateById = async (id, prodUpdate) => {
        try {
            await ProductModel.updateOne({_id: id}, prodUpdate);
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        try {
            const product = await ProductModel.findById(id).lean();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async () => {
        try {
            const products = await ProductModel.find().lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    deleteById = async (id) => {
        try {
            let o_id = new ObjectId(id)
            await ProductModel.deleteMany({_id: o_id});
        } catch (error) {
            console.log(error);
        }
    }

    deleteAll = async () => {
        try {
            await ProductModel.deleteMany();
        } catch (error) {
            console.log(error);
        }
    }
}

export default Product;

