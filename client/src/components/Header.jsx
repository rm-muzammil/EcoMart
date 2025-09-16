import { ShoppingCart, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-green-600 cursor-pointer"
          >
            EcoMart
          </Link>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Side: Cart + Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Mobile Only) */}

            {/* Cart */}
            <button className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            {/* Auth Buttons */}
            <button className="px-3 py-1 text-gray-700 hover:text-green-600">
              Login
            </button>
            <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
