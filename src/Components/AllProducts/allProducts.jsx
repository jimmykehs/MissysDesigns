import React, { useEffect } from "react";
import ProductCard from "./productCard";
import "./products.css";

const AllProducts = ({ allProducts, setCart, cart, setNavContent }) => {
  useEffect(() => {
    setNavContent({
      navText: "Missy's Designs",
      navTextLink: "/",
      navHome: false,
      navCart: true,
    });
  }, []);

  return (
    <div id="all-products-page">
      <div id="all-products">
        {allProducts &&
          allProducts.map((product, index) => {
            return (
              <ProductCard
                key={product.product_id}
                product={product}
                cart={cart}
                setCart={setCart}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AllProducts;
