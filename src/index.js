import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContextProdiver } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProdiver>
    <App />
  </AuthContextProdiver>,
  document.getElementById("root")
);
