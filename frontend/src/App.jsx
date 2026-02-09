import { MsalProvider } from "@azure/msal-react";
import {AppContent} from "./routes/AppContent";
import {Header} from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import { useMsalAuth } from "./hooks/useMsalAuth";

export const App = ({ instance }) => {

  return (
    <MsalProvider instance={instance}>
      <BrowserRouter>
        <Header/>
        <AppContent/>
      </BrowserRouter>
    </MsalProvider>
  );
};
