import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter } from "react-router-dom";
import { AppContent } from "./pages/AppContent";
import { Header } from "./components/layout/Header";

import "./styles/App.css";

export const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MsalProvider>
  );
};
