//? React
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

//? Components
import Footer from "./components/Footer/Footer";

//? Views
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import Faqs from "./Views/Faqs/Faqs";
import Login from "./Views/Login/Login";

//? Styles
import "./App.css";
import Tienda from "./Views/Tienda/Tienda";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const location = useLocation();

  return (
    <div className="App">

      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tienda" element={<Tienda />}/> 
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
