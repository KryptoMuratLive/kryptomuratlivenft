import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiWrapper } from "./components/WagmiProvider.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <WagmiWrapper>
        <App />
      </WagmiWrapper>
    </LanguageProvider>
  </StrictMode>,
);
