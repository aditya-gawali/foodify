import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Index from "./components/Navbar/Index.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { Toaster } from 'sonner';
import { useStore } from "./stores/useStore";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { setToken, setUserId } = useStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (savedToken) {
      setToken(savedToken); // Set token in Zustand store
      setUserId(savedUserId)
    }
  }, []);


  return (
    <>
      <Toaster richColors position="top-center" />

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        {/* <Index /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
