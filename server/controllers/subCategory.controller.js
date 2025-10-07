import SubCategoryModel from "../models/subCategory.model.js";
export const getSubCategoryController = async (request, response) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.messsage || error,
      error: true,
      success: false,
    });
  }
};

export const createSubCategoryController = async (request, response) => {
  try {
    const { name, image, category } = request.body;
    if (!name || !category || !image) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false,
      });
    }
    const addSubCategory = new SubCategoryModel({
      name,
      category,
      image,
    });
    const saveSubCategory = await addSubCategory.save();
    if (!saveSubCategory) {
      return response.status(500).json({
        message: "Failed to create sub category",
        error: true,
        success: false,
      });
    }
    return response.status(201).json({
      message: "Sub category created successfully",
      data: saveSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
