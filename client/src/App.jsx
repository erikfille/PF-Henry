import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home/Home";
import Footer from "./Views/Footer/Footer";
import Faqs from "./Views/Faqs/Faqs";

import "./App.css";

function App() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="App">
      <button onClick={() => loginWithRedirect()}>Login</button>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="" element={<Footer />}></Route>
        <Route path="" element={<Faqs />}></Route>
      </Router>
    </div>
  );
}

export default App;
