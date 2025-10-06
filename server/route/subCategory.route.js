import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createSubCategoryController,
  getSubCategoryController,
} from "../controllers/subCategory.controller.js";
const subCategoryRouter = Router();
subCategoryRouter.post("/create", auth, createSubCategoryController);
subCategoryRouter.post("/get", getSubCategoryController);
export default subCategoryRouter;
