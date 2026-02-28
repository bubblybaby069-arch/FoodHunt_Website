import Menu from "../models/Menu.js";
import { cloudinary } from "../config/cloudinary.js";

export const addMenu = async (req, res) => {
  try {
    const { name, description, offerPrice, actualPrice, category } = req.body;

    if (!name || !offerPrice || !actualPrice || !category || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    if (!req.file.buffer) {
      return res.status(400).json({ success: false, message: "File is empty" });
    }

    const streamUpload = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "food-app/menus" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer);
      });

    const result = await streamUpload(req.file.buffer);

    const menuItem = await Menu.create({
      name,
      description,
      offerPrice,
      actualPrice, // ✅ pass this
      category,
      image: result.secure_url,
    });

    res.status(201).json({ success: true, message: "Menu added", menuItem });
  } catch (error) {
    console.log("Add menu error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET all menus
export const getMenus = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const menus = await Menu.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, menuItems: menus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// DELETE menu (Admin)
export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    await menu.deleteOne();

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


