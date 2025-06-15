import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./Routes.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
