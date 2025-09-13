// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name Required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email Required"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       default: "",
//     },
//     mobile: {
//       type: Number,
//       default: null,
//     },
//     refreash_token: {
//       type: String,
//       default: "",
//     },
//     verify_email: {
//       tpye: Boolean,
//       default: false,
//     },
//     last_login_date: {
//       type: Date,
//       default: "",
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Inactive", "Suspended"],
//       default: "Active",
//     },
//     address_details: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "address",
//       },
//     ],
//     shopping_cart: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "cartProduct",
//       },
//     ],
//     orderHistory: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "order",
//       },
//     ],
//     forgot_password_otp: {
//       type: String,
//       default: null,
//     },
//     forgot_password_expiry: {
//       type: Date,
//       default: "",
//     },
//     role: {
//       type: String,
//       enum: ["USER", "ADMIN"],
//       default: "USER",
//     },
//   },
//   { timestamps: true }
// );

// const UserModel = mongoose.model("User", userSchema);

// export default UserModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    mobile: {
      type: Number,
      default: null,
    },
    refresh_token: {
      // ✅ fixed typo: refreash_token → refresh_token
      type: String,
      default: "",
    },
    verify_email: {
      // ✅ fixed tpye → type
      type: Boolean,
      default: false,
    },
    last_login_date: {
      type: Date,
      default: null, // ✅ null instead of empty string
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: null, // ✅ null instead of empty string
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
