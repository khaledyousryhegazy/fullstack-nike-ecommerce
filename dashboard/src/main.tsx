import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./rtk/store.ts";
import RootLayout from "./RootLayout.tsx";



// Render the app
createRoot( document.getElementById( "root" )! ).render(
  <StrictMode>
    <Provider store={ store }>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <RootLayout />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
