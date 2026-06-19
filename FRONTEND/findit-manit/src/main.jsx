import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/space-grotesk";

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY =
  "pk_test_aW5maW5pdGUtcG9sbGl3b2ctMjUuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
const theme = localStorage.getItem("theme");
if(theme==="dark"){
  document.documentElement.classList.add("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_aW5maW5pdGUtcG9sbGl3b2ctMjUuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);