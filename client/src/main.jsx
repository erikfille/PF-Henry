import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Import css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
