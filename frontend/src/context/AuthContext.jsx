import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // future: Entra ID profile
  const [roles, setRoles] = useState([]); // future: RBAC claims

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData || null);
    // roles will come from token later
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        roles,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
