//? React
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

//? Components
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import ModalConsultaGenerico from "./components/ModalGenerico/ModalConsultaGenerico";

//? Views
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import Faqs from "./Views/Faqs/Faqs";
import Header from "./components/Header/Header";
import Tienda from "./Views/Tienda/Tienda";
import Servicios from "./Views/Servicios/Servicios";
import Contacto from "./Views/Contacto/Contacto";
import Login from "./Views/Login/Login";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import Detail from "./Views/Detail/Detail";
import UserProfile from "./Views/UserProfile/UserProfile";
import CheckOut from "./Views/Checkout/Checkout";

//? Styles
import "./App.css";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header /> &&
        location.pathname !== "/signup" && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos/:productId" element={<Detail />} />
        <Route path="/crearProducto" element={<CreateProduct />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
      <Cart />
      <ModalConsultaGenerico />
      {location.pathname !== "/login" && <Footer /> &&
        location.pathname !== "/signup" && <Footer />}
    </div>
  );
}

export default App;
