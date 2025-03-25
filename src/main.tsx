import { StrictMode } from "react";
import { Container, createRoot } from "react-dom/client";

import "@app/styles/index.css";

import App from "@app/app";

createRoot(document.getElementById("root") as Container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
