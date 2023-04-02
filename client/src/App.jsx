//? React
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

//? Components
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import ModalConsultaGenerico from "./components/ModalGenerico/ModalConsultaGenerico";
import { useProduct } from "../src/hooks/useStore";

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
import Detail from "./Views/ProductDetail/Detail";
import UserProfile from "./Views/UserProfile/UserProfile";
import CheckOut from "./Views/Checkout/Checkout";
import ProviderDashboard from "./Views/ProviderDashboard/ProviderDashboard";

//? Styles
import "./App.css";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header /> &&
        location.pathname !== "/signup" && <Header />}

      {/* { !datos
        ? <p>Aguarde un momento...</p>
        : <CheckOut productos={productos} data ={datos}/>
      } */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos/:productId" element={<Detail />} />
        <Route path="/crearProducto" element={<CreateProduct />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/provider/:providerId" element={<ProviderDashboard />} />
      </Routes>
      <Cart />
      <ModalConsultaGenerico />
      {location.pathname !== "/login" && <Footer /> &&
        location.pathname !== "/signup" && <Footer />}
    </div>
  );
}

export default App;
