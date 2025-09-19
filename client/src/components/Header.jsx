import { useEffect, useState } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../store/userSlice"; // <-- your logout action
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice"; // ✅ import logout action
import axios from "axios";

export default function Header() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const handleDropdownClose = () => {
  //   dropdownOpen(false);
  // };
  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleLogout = async () => {
    try {
      const res = await Axios("http://localhost:8080/api/user/logout");

      if (res.data.success) {
        dispatch(logout()); // ✅ clears Redux state
        localStorage.clear();
        toast.success(res.data.message || "Logged out successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-600 cursor-pointer"
          >
            EcoMart
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Side */}
          <div className="flex items-center space-x-4 relative">
            {/* Cart */}
            <button className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                {user?.shopping_cart?.length || 0}
              </span>
            </button>

            {/* Auth / User */}
            {!user?._id ? (
              <>
                <Link
                  to={"/login"}
                  className="px-3 py-1 text-gray-700 hover:text-green-600"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* Avatar Button */}
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={
                      user.avatar ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(user.name)
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full border"
                  />
                  {/* <ChevronDown className="w-4 h-4 text-gray-600" /> */}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/saved-address"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Saved Addresses
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
