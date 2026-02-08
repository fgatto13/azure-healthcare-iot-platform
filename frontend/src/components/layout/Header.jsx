import { NavLink } from "react-router-dom";
import { useMsalAuth } from "../../hooks/useMsalAuth";

export const Header = () => {
  const { isAuthenticated } = useMsalAuth();

  return (
    <header>
      <nav>
        <ul>
          {!isAuthenticated && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/patient/1">Patient</NavLink>
              </li>
              <li>
                <button onClick={() => instance.logoutRedirect()}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
