import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!isAuthenticated && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/patient/1">Patient</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}

          <li>
            <NavLink to="/help">Help</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
