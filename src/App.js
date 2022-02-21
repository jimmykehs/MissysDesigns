import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar/navbar";
import AllProducts from "./Components/AllProducts/allProducts";
import { useEffect, useState } from "react";
import CartPage from "./Components/Cart/cart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderDetails from "./Components/OrderDetails/OrderDetails";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";

function App() {
  const [navContent, setNavContent] = useState({
    navText: "Missy's Designs",
    navTextLink: "/",
    navHome: false,
    navCart: true,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("MDCart")) || []
  );
  const [token, setToken] = useState(localStorage.getItem("MDToken"));

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

  useEffect(() => {
    localStorage.setItem("MDToken", token);
  }, [token]);

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
          <NavBar navContent={navContent} />
          <Routes>
            <Route
              path="/"
              element={
                <AllProducts
                  allProducts={allProducts}
                  setCart={setCart}
                  cart={cart}
                  setNavContent={setNavContent}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  setCart={setCart}
                  setNavContent={setNavContent}
                />
              }
            />
            <Route
              path="/orders/:orderId"
              element={<OrderDetails setNavContent={setNavContent} />}
            />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/admin" element={<Admin token={token} />} />
          </Routes>
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
