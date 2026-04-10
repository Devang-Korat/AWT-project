const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      modelNumber,
      barcode,
      price,
      costPrice,
      stock,
      minStockAlert,
      description,
      categoryId,
    } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({
        message: "Name, Price and Category are required",
      });
    }

    const image = req.file ? `/images/${req.file.filename}` : "";

    const product = new Product({
      name,
      brand,
      modelNumber,
      barcode,
      price,
      costPrice,
      stock,
      minStockAlert,
      description,
      categoryId,
      image,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId"); 

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.image = `/images/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      message: "Product updated",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

