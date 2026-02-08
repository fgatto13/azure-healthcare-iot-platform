import { useMsalAuth } from "../hooks/useMsalAuth";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";

export const AppContent = () => {
  const { isAuthenticated } = useMsalAuth();

  return isAuthenticated ? <Dashboard /> : <Login />;
};
