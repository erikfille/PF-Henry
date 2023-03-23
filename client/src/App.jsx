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
import Header from "./components/Header/Header";
import Tienda from "./Views/Tienda/Tienda";
import Servicios from "./Views/Servicios/Servicios";
import Contacto from "./Views/Contacto/Contacto";
import Login from "./Views/Login/Login";


//? Styles
import "./App.css";
import Tienda from "./Views/Tienda/Tienda";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
	const [user, setUser] = useState({});
	const location = useLocation();

	const clientID = "756465634743-0hd8ke48er3tkrt4siag4o30m7h73a8c.apps.googleusercontent.com";

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: clientID,
			});
		};
		gapi.load("client:auth2", start);
	}, []);

	const onSuccess = (response) => {
		console.log(response);
		setUser(response);
	};

	const onFailure = () => {
		console.log("Something went wrong");
	};
  
  return (
    <div className="App">
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tienda" element={<Tienda />}/>
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/servicios' element={<Servicios />} />
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
