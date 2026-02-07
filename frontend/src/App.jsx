import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Dashboard} from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Patient} from "./pages/Patient";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./styles/App.css";

export const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />

          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patient/:id" element={<Patient />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
      <Footer/>
    </>
  );
}
