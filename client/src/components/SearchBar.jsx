import { Search } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const redirectTOSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
      {/* Animated Placeholder */}
      {value === "" && (
        <TypeAnimation
          sequence={[
            "Search for Milk...",
            1500,
            "Search for food...",
            1500,
            "Search for Guinea Pig food...",
            1500,
            "Search for Chinchilla food...",
            1500,
          ]}
          wrapper="span"
          speed={50}
          className="absolute left-4 text-gray-400 text-sm pointer-events-none"
          repeat={Infinity}
        />
      )}

      {/* Search Input */}
      <input
        type="text"
        aria-label="Search products"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={redirectTOSearchPage}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Search Button */}
      <button
        aria-label="Search"
        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-r-lg text-white transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}

export default SearchBar;
