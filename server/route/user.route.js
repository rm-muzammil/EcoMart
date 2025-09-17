import { Router } from "express";
import {
  forgotPasswordController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
  resetPasswordController,
  updateUserDetails,
  uploadAvatar,
  verifyEmailController,
  verifyForgotPasswordOtpController,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const userRouter = Router();
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtpController
);
userRouter.put("/reset-password", resetPasswordController);
userRouter.put("/refresh-token", refreshTokenController);

export default userRouter;
