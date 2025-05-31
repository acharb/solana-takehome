import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { Demo } from "@/Demo";
import { AlertProvider } from "@/context/AlertContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <Demo />
    </AlertProvider>
  </StrictMode>
);
