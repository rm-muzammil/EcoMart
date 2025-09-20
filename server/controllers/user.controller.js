import verifyEmailTemplate from "../utils/VerifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, and password are required",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: `This Email: ${email} Already registered`,
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();
    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTO: email,
      subject: "Verification",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });
    return res.json({
      message: "User Resistered successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Code",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.status(201).json({
      message: "Email verified",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Passwor are required",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "user not found",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message:
          "Your account maybe Inactive or Suspended, please contact to Admin",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date().toISOString(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function logoutUserController(req, res) {
  try {
    const userId = req.userId;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      message: "User Logout",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function getLoginedUserDetailsController(req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );
    return res.json({
      message: "User Details:",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });
    return res.json({
      message: "Profile Updated",
      success: true,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}
export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;
    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );
    return res.json({
      message: "User update",
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User fon found",
        success: false,
        error: true,
      });
    }
    const otp = generatedOtp();
    const expireTime = new Date() + 1000 * 60 * 10;

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });
    await sendEmail({
      sendTO: email,
      subject: "Forgot Password",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });
    return res.json({
      message: "check your email",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
export async function verifyForgotPasswordOtpController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are Required",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "OTP Experied",
        success: false,
        error: true,
      });
    }
    if (user.forgot_password_otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP!",
        success: false,
        error: true,
      });
    }
    await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "Verify OTP",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
export async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are Required",
        success: false,
        error: true,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is Invalid",
        success: false,
        error: true,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password must be same",
        success: false,
        error: true,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const update = await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Password Updated Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.header?.authorization.split(" ")[1];

    if (!refreshToken) {
      return res.status(400).json({
        message: "Unautorized access",
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token Experied",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", newAccessToken, cookiesOption);
    return res.json({
      message: "New Access Token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
