const Product = require("../models/Product");


exports.addProduct = async (req, res) => {
  try {
    const {
      category,
      code,
      name,
      size,
      price,
      pkd,
      stock,
      isDiscountAllowed,
      discountPercentage
    } = req.body;

    const img = req.file?.path;

    if (!img) {
      return res.status(400).json({ error: "Image upload failed. No file received." });
    }

    const product = new Product({
      category,
      code,
      name,
      size,
      price,
      pkd,
      img,
      stock,
      isDiscountAllowed,
      discountPercentage,
    });

    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    console.error("Add Product Error:", err); // 🔍 Log full error
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };
    if (req.file) {
      updatedData.img = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updatedData, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
