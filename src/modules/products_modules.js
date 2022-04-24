import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    timestamp: {
        type: Date, 
        default: Date.now
    }
});

export const ProductModel = mongoose.model('Product', Schema);
