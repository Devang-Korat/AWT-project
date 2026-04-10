const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    if (name.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    let imagePath = "";

    if (req.file) {
      imagePath = `/images/${req.file.filename}`;
    }

    const category = new Category({
      name: name.trim(),
      description,
      image: imagePath,   
      isActive: true
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });

    res.json(categories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};