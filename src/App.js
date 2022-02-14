import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./Components/Navbar/navbar";
import AllProducts from "./Components/AllProducts/allProducts";
import { useEffect, useState } from "react";
import CartPage from "./Components/Cart/cart";
import ShippingDetails from "./Components/Checkout/ShippingDetails";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderDetails from "./Components/OrderDetails/OrderDetails";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("MDCart")) || []
  );

  useEffect(() => {
    localStorage.setItem("MDCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const localStorageCart = localStorage.getItem("MDCart");
    if (localStorageCart) {
      setCart(JSON.parse(localStorageCart));
    }

    fetch("/api/products")
      .then((res) => res.json())
      .then((result) => {
        setAllProducts(result.sort((a, b) => a.name - b.name));
      });
  }, []);

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    "data-client-token": "",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <div id="app">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <AllProducts
                  allProducts={allProducts}
                  setCart={setCart}
                  cart={cart}
                />
              }
            />
            <Route path="/account" />
            <Route
              path="/cart"
              element={<CartPage cart={cart} setCart={setCart} />}
            />
            <Route
              path="/customershipping"
              element={<ShippingDetails cart={cart} setCart={setCart} />}
            />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          </Routes>
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
