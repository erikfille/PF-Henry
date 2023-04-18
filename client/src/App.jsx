//? React
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

//? Components
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import ModalConsultaGenerico from "./components/ModalGenerico/ModalConsultaGenerico";
import ModalCreatePet from "./components/ModalCreatePet/ModalCreatePet";
import ModalPetDetail from "./components/ModalPetDetail/ModalPetDetail";
import ModalInfoGenerico from "./components/ModalInfoGenerico/ModalInfoGenerico";
import ModalEditCategory from "./Views/DashboardAdmin/DashCategories/ModalEditCategory";
import ModalEditAnimals from "./Views/DashboardAdmin/DashAnimals/ModalEditAnimals";

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
import PayPal from "./Views/Checkout/PayPal";
import Terminos from "./Views/Terminos/Terminos";
import Ubicacion from "./Views/Ubicacion/Ubicacion";

//? Styles
import "./App.css";

import AdminDashboard from "./Views/DashboardAdmin/AdminDashboard";
import DashUser from "./Views/DashboardAdmin/DashUser/DashUser";
import DashProvider from "./Views/DashboardAdmin/DashProvider/DashProvider";
import DashProduct from "./Views/DashboardAdmin/DashProduct/DashProduct";
import DashCategories from "./Views/DashboardAdmin/DashCategories/DashCategories";
import DashAnimals from "./Views/DashboardAdmin/DashAnimals/DashAnimals";
import DashProfile from "./Views/ProviderDashboard/DashPerfil/DashPerfil";
import DashProductos from "./Views/ProviderDashboard/DashProductos/DashProductos";
import DashActividades from "./Views/ProviderDashboard/DashActividades/DashActividades";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header /> &&
        location.pathname !== "/signup" && <Header /> &&
        !location.pathname.toLowerCase().includes("/admindashboard") && <Header /> &&
        !location.pathname.toLowerCase().includes("/providerdashboard") && <Header />} 

      <Routes>
        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route path="/adminDashboard/users" element={<DashUser />} />
          <Route path="/adminDashboard/providers" element={<DashProvider />} />
          <Route path="/adminDashboard/products" element={<DashProduct />} />
          <Route
            path="/adminDashboard/categories"
            element={<DashCategories />}
          />
          <Route path="/adminDashboard/animals" element={<DashAnimals />} />
        </Route>
        
        <Route path="/providerDashboard" element={<ProviderDashboard />}>
          <Route path="/providerDashboard/profile" element={<DashProfile />} />
          <Route path="/providerDashboard/products" element={<DashProductos />} />
          <Route path="/providerDashboard/activities" element={<DashActividades />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/paypal" element={<PayPal />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/productos/:productId" element={<Detail />} />
        <Route path="/crearProducto" element={<CreateProduct />} />
        <Route path="/perfil" element={<UserProfile />}>
          <Route path="/perfil/:userId" element={<UserProfile />} />
        </Route>
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/provider/:providerId" element={<ProviderDashboard />} />
      </Routes>
      <Cart />
      <ModalConsultaGenerico />
      <ModalCreatePet />
      <ModalPetDetail />
      <ModalInfoGenerico />
      <ModalEditCategory />
      <ModalEditAnimals />
      {location.pathname !== "/login" && <Footer /> &&
        location.pathname !== "/signup" && <Footer /> &&
        !location.pathname.toLowerCase().includes("/admindashboard") && <Footer />&&
        !location.pathname.toLowerCase().includes("/providerdashboard") && <Footer />}
    </div>
  );
}

export default App;
