import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";

export default function SubCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await Axios.get("/category");
    setCategories(res.data.data);
  };

  const fetchSubcategories = async () => {
    const res = await Axios.get("/subcategory");
    setSubcategories(res.data.data);
  };

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!name.trim() || !selectedCategory)
      return toast.error("Select category & enter subcategory name");

    try {
      const res = await Axios.post("/subcategory", {
        name,
        category: selectedCategory,
      });
      toast.success(res.data.message || "Subcategory added");
      setName("");
      fetchSubcategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding subcategory");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Subcategories</h1>

      <form
        className="flex flex-col md:flex-row gap-2 mb-6"
        onSubmit={handleAddSubcategory}
      >
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter subcategory name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {subcategories.map((sub) => (
          <li
            key={sub._id}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <span>{sub.name}</span>
            <span className="text-gray-500 text-sm">
              {sub.category?.name || "No Category"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
