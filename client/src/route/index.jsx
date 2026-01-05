import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Categories from "../pages/Categories";
import SubCategories from "../pages/SubCategories";
import UploadProduct from "../pages/UploadProduct";
import Product from "../pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "my-orders", element: <MyOrders /> },
          { path: "address", element: <Address /> },
          { path: "categories", element: <Categories /> },
          { path: "sub-categories", element: <SubCategories /> },
          { path: "upload-product", element: <UploadProduct /> },
          { path: "products", element: <Product /> },
        ],
      },
      {
        path: ":category/",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
    ],
  },
]);
export default router;
