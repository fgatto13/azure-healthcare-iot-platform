import { NavLink } from "react-router-dom";
import { useMsalAuth } from "../../hooks/useMsalAuth";

export const Header = () => {
  const { isAuthenticated } = useMsalAuth();

  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-md font-medium transition-colors duration-200 no-underline ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <header className="bg-white shadow-md rounded-sm border-2 border-blue-400">
      <div className="text-2xl font-bold text-blue-600">Healthcare Portal</div>
      <nav className="container mx-2 px-4 py-3 flex justify-between items-center">

        <ul className="flex gap-3 items-center m-0 p-0 list-none">
          {!isAuthenticated && (
            <li>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </li>
          )}

          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/dashboard" className={linkClasses}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={linkClasses}>
                  Account
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
