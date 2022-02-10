import React, { useEffect, useState } from "react";

const Total = ({ total }) => {
  return (
    <div id="price-box">
      <h3>Total:</h3>
      <p className="price">${total.toFixed(2)}</p>
    </div>
  );
};

export default Total;
