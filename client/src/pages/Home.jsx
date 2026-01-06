import React, { use } from "react";
import banner from "../assets/banner.jpg";
import mobile_banner from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

function Home() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const allCategoryData = useSelector((state) => state.product.allCategory);
  const allSubCategoryData = useSelector(
    (state) => state.product.allSubCategory
  );

  const handleRedirectProductListPage = (id, name) => {
    const subCategory = allSubCategoryData.filter(
      (subCat) => subCat.categoryId === id
    );
    console.log(subCategory);
  };

  return (
    <section>
      <div className="container mx-auto p-4">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse"
          }`}
        >
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src={mobile_banner}
            alt="Mobile Banner"
            className="w-full h-full block lg:hidden"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 grid gap-4 grid-cols-5 md:grid-cols-8 lg:grid-cols-10 mt-8">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => {
              return (
                <div
                  key={index + "dis"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-md"
                >
                  <div className="bg-blue-100 min-h-24"></div>
                  <div className="bg-blue-100 h-8"></div>
                  {/* <div>
                  <div className="bg-blue-100 h-8"></div>
                  <div className="bg-blue-100 h-8"></div>
                </div> */}
                </div>
              );
            })
          : allCategoryData.map((category, index) => {
              return (
                <div
                  key={index + "cat"}
                  className="bg-white rounded p-4 min-h-36 grid  gap-2 shadow-md"
                  onClick={() =>
                    handleRedirectProductListPage(category.id, category.name)
                  }
                >
                  <div>
                    <img src={category.image} alt="" />
                  </div>
                </div>
              );
            })}
      </div>
      <div>
        {allCategoryData.map((category, index) => {
          return (
            <CategoryWiseProductDisplay
              key={"CWPD" + index}
              id={category.id}
              name={category.name}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Home;
