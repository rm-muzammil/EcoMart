import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [editProductData, setEditProductData] = useState({
    name: "",
    image: "",
    category: "",
  });

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
        },
      });

      const { data: responseData } = response;

      console.log("product page ", responseData);
      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: productId },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        fetchProductData();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      <div className="flex flex-wrap gap-4">
        {productData.map((product) => (
          <div key={product._id}>
            <img src={product.image} alt={product.name} width="100" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => {
                setOpenEditProduct(true);
                setEditProductData(product);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              update
            </button>

            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {openEditProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              value={editProductData.name}
              onChange={(e) =>
                setEditProductData({ ...editProductData, name: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <input
              type="text"
              value={editProductData.image}
              onChange={(e) =>
                setEditProductData({
                  ...editProductData,
                  image: e.target.value,
                })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <input
              type="text"
              value={editProductData.category}
              onChange={(e) =>
                setEditProductData({
                  ...editProductData,
                  category: e.target.value,
                })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            />
            <button>update</button>
            <button
              onClick={() => setOpenEditProduct(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
