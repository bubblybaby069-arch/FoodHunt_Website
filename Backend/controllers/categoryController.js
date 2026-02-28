import Category from "../models/Category.js";
import { cloudinary } from "../config/cloudinary.js";

// Add category (Admin only)
export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !req.file) {
      return res.status(400).json({ success: false, message: "Name and image required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category exists" });
    }

    // Upload image buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "foodhunt/categories" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ success: false, message: error.message });
        }

        // Save category in DB
        const category = await Category.create({
          name,
          description,
          image: result.secure_url,
        });

        return res.status(201).json({ success: true, category });
      }
    );

    // Pipe the buffer to Cloudinary
    result.end(req.file.buffer);

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Delete the category
    await category.deleteOne();

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
