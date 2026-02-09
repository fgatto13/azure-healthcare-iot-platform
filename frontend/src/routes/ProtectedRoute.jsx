import { useNavigate } from "react-router-dom";
import { useMsalAuth } from "../hooks/useMsalAuth";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, inProgress } = useMsalAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (inProgress === "none" && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, inProgress, navigate]);

  // While MSAL is resolving, render nothing
  if (inProgress !== "none") {
    return null;
  }

  // MSAL done, but not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
};
