import { MsalProvider } from "@azure/msal-react";
import {AppContent} from "./pages/AppContent";

import "./styles/App.css";

export const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <AppContent />
    </MsalProvider>
  );
};
