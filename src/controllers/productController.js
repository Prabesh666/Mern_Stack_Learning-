import productService from "../services/productService.js";

const getProducts = (req, res) => {
    //request Query

    const products = productService.getProducts(req.query);
    res.status(200).json(products);
};
const getProductById = (req, res) => {
    //Request Params 

    const id = req.params.id;
    const product = productService.getProductById(id);

    res.json(product);
};
const updateProduct = (req, res) => {
    res.send("The New Product is updated ");
};
const deleteProduct = (req, res) => {
    res.send("The bad product is deleted ");
};
const createProduct = (req, res) => {
    productService.createProduct(req.body)

    res.status(201).send("Product Created Successfully.");

};
export default {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};