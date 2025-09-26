import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";

export default function UploadProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const res = await Axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Product uploaded");
      setProductData({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        image: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading product");
    }
  };

  useEffect(() => {
    (async () => {
      const catRes = await Axios.get("/category");
      setCategories(catRes.data.data);

      const subRes = await Axios.get("/subcategory");
      setSubcategories(subRes.data.data);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload Product</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Product Price"
          type="number"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={productData.subcategory}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <input type="file" name="image" onChange={handleChange} />

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Upload
        </button>
      </form>
    </div>
  );
}
