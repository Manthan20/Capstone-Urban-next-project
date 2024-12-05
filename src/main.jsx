// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; 
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="13625815331-7divknc4es2volnpsp7ohqehvjhlngcp.apps.googleusercontent.com">
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
