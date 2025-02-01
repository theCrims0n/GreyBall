import mongoose from "mongoose";

const products = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    rating: { type: Number, required: true },
    images: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Products = mongoose.models.products || mongoose.model('products', products);

export default Products