const product = require("../models/product");


// Get all products
const getCars = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(409).json({ success: false, data: [], error: error });
    }
}

// Get product by ID
const getcarsId = async (req, res) => {
    const productId = req.params.productId;
    try {
        const productData = await product.findById(productId);
        res.status(200).json({ success: true, data: productData });
    } catch (error) {
        res.status(409).json({ success: false, data: null, error: error });
    }
}

// Delete all products
const deleteCars = async (req, res) => {
    try {
        const result = await product.deleteMany();
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(409).json({ success: false, data: null, error: error });
    }
}

// Delete product by ID
const deletecarsId = async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await product.findByIdAndDelete(productId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(409).json({ success: false, data: null, error: error });
    }
}

// Get products by name //ERRROR
const getcarsName = async (req, res) => {
    const keyword = req.query.name; // Use req.query to access query parameters
    const query = {};
    if (keyword) {
        query.name = { $regex: new RegExp(keyword, 'i') };
    }
    try {
        const display = await product.find(query);
        res.status(200).json({ success: true, data: display });
    } catch (error) {
        res.status(409).json({ success: false, data: [], error: error });
    }
}


// Update product by ID
const updateCars = async (req, res) => {
    const productId = req.params.productId;
    const { name, description, price, quantity, category } = req.body;

    try {
        const updatedItem = await product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            quantity,
            category,
        }, { new: true });

        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(409).json({ success: false, data: null, error: error });
    }
}

// Add a new product
const addCars = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    try {
        const newProduct = new product({
            name,
            description,
            price,
            quantity,
            category,
        });

        const saveProduct = await newProduct.save();
        res.status(201).json({ success: true, data: saveProduct });
    } catch (error) {
        res.status(409).json({ success: false, data: null, error: error });
    }
}

module.exports = {
    addCars, // POST
    getCars, // GET all
    getcarsId, // GET by ID
    deleteCars, // DELETE all
    deletecarsId, // DELETE by ID
    updateCars, // PUT by ID
    getcarsName // GET by name
};