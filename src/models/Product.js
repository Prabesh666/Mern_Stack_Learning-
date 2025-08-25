import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    brand: String,
    category: {
        type: String,
        required: [true, "please enter the category  of the product"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of the product"],
        min: [1, "recheck the price of product"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    stock: {
        type: Number,
        select: false,
        default: 1,
        max: [1000, "stock is too high and enter according to the rules"],
    },

    imageUrls: {
        type: [String],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Created by user is  required."],
    },
    description: String,
});

const model = mongoose.model("Product", ProductSchema);

export default model;