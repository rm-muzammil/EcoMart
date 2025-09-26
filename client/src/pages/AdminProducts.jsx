import { useState, useEffect } from "react";
import Axios from "../../utils/Axios";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await Axios.get("/product");
      setProducts(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Products</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-500">PKR {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
