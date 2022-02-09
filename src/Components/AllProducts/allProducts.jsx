import React from "react";
import ProductCard from "./productCard";
import "./products.css";

const AllProducts = ({ allProducts, setCart, cart }) => {
  return (
    <div id="all-products-page">
      <h1 className="page-title">All Products</h1>
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
