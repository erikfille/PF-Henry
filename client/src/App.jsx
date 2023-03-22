//? React
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";

// Google Auth
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

//? Components
import Footer from "./components/Footer/Footer";

//? Views
import Home from "./Views/Home/Home";
import About from "./Views/About/About";
import Faqs from "./Views/Faqs/Faqs";

//? Styles
import "./App.css";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();

  const clientID =
    "756465634743-0hd8ke48er3tkrt4siag4o30m7h73a8c.apps.googleusercontent.com";

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
      {location.pathname === "/login" && (
        <div className="btn">
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
          />
        </div>
      )}

      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
