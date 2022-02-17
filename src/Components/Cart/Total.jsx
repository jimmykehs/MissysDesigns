import React from "react";

const Total = ({ total, specialInstructions }) => {
  return (
    <div id="price-box">
      <div className="total-container">
        <p>Total:</p>
        <p className="price">${total.toFixed(2)}</p>
      </div>

      <textarea
        className="special-instructions-input"
        rows="2"
        placeholder="Special Instructions"
        onChange={(e) => {
          specialInstructions.current = e.target.value;
        }}
      ></textarea>
    </div>
  );
};

export default Total;
