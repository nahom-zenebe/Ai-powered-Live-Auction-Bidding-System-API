import Category from "../models/Category.model.js";
import CustomError from "../utils/CustomError.js";

// ===============================
// CREATE CATEGORY
// ===============================
export async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;

    if (!name) {
      throw new CustomError("Category name is required", 400);
    }

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// GET ALL CATEGORIES
// ===============================
export async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// GET SINGLE CATEGORY
// ===============================
export async function getSingleCategory(req, res, next) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      throw new CustomError("Category ID is required", 400);
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// UPDATE CATEGORY
// ===============================
export async function updateCategory(req, res, next) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      throw new CustomError("Category ID is required", 400);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new CustomError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
}

// ===============================
// DELETE CATEGORY
// ===============================
export async function deleteCategory(req, res, next) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      throw new CustomError("Category ID is required", 400);
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      throw new CustomError("Category not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
}
