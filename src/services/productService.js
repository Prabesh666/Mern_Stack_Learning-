import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import { ADMIN } from "../constants/roles.js";
import Product from "../models/Product.js";
import uploadFile from "../utils/file.js";
import promptGemini from "../utils/gemini.js";



const getProducts = async(query) => {
    const {
        brands,
        category,
        min,
        max,
        limit,
        name,
        offset,
        createdBy
    } = query;


    const sort = JSON.parse(query.sort || "{}");

    const filters = {};

    if (min) filters.price = {
        $gte: min
    };
    if (max) filters.price = {
        ...filters.price,
        $lte: max
    };

    if (brands) {
        const brandItems = brands.split(",");
        filters.brand = {
            $in: brandItems
        };
    }
    if (category) filters.category = category;

    if (name) filters.name = {
        $regex: name,
        $options: "i"
    }; // case insensitive

    if (createdBy) filters.createdBy = createdBy;



    const Products = await Product.find(filters).sort(sort).limit(limit).skip(offset);


    if (!Products) {
        throw {
            statusCode: 404,
            message: "Product not found.",
        };
    }

    return Products;

};
const getProductById = async(id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw {
            statusCode: 404,
            message: "Product not found.",
        };
    }

    if (product.stock < 1) {
        throw {
            message: "Product not available",
        };
    }

    return product;
};
const createProduct = async(data, files, createdBy) => {
    const uploadedFiles = await uploadFile(files);

    const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
        .replace("%s", data.brand)
        .replace("%s", data.category);
    const description = data.description || (await promptGemini(promptMessage));
    const createdProduct = await Product.create({
        ...data,
        createdBy,
        imageUrls: Array.isArray(uploadedFiles) ?
            uploadedFiles.map(item => (item && item.url ? item.url : "")) : [],
        description,


    });


    return createdProduct;

};

const updateProduct = async(id, data, files, user) => {
    const product = await getProductById(id);
    if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
        throw {
            statusCode: 403,
            message: "Access denied.",
        };
    }
    const updateData = data;

    if (files && files.length > 0) {
        const uploadedFiles = await uploadFile(files);
        updateData.imageUrls = uploadedFiles
            .filter(item => item && item.url)
            .map(item => item.url);

    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
    });

    return updatedProduct;
};



const deleteProduct = async(id, user) => {
    const product = await getProductById(id);

    if (product.createdBy != user._id && !user.roles.includes(ADMIN)) {
        throw {
            statusCode: 403,
            message: "Access denied.",
        };
    }

    await Product.findByIdAndDelete(id);
};
export default {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};