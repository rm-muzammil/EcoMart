import React, { useEffect, useState } from "react";
import CardLoading from "./CardLoading";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import CardProduct from "./CardProduct";

function CategoryWiseProductDisplay({ id, name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryWiseData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id },
      });

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseData();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{name}</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View All
        </button>
      </div>

      <div className="container mx-auto px-4 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {loading &&
          Array(12)
            .fill(null)
            .map((_, index) => <CardLoading key={index} />)}

        {data.map(
          (product, index) => (
            console.log(product),
            (<CardProduct key={product._id || index} data={product} />)
          )
        )}
      </div>
    </div>
  );
}

export default CategoryWiseProductDisplay;
