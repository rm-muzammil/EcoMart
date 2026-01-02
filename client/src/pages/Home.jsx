import React from "react";
import banner from "../assets/banner.jpg";
import mobile_banner from "../assets/banner-mobile.jpg";

function Home() {
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
    </section>
  );
}

export default Home;
