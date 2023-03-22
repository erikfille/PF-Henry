//? React
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useLocation } from "react-router-dom";

//? Components
import Footer from "./components/Footer/Footer";

//? Views
import Home from "./Views/Home/Home";
import About from "./Views/About/About"
import Faqs from "./Views/Faqs/Faqs";

//? Styles
import "./App.css";

function App() {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== "/loguin" && 
        <div>
          <Footer></Footer>
        </div>  
      }

      {location.pathname === "/loguin" && 
        <div>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      }
      
      <Routes>
        <Route path="/inicio" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/faqs" element={<Faqs />}/>
      </Routes>
    </div>
  );
}

export default App;
