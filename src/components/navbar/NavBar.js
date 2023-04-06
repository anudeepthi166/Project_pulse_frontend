import { NavLink } from "react-router-dom";
// css
import "./NavBar.css";

function NavBar() {
  return (
    <div className=" mb-3 navigation-bar ">
      <div className="container">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link nav-bar" : "inactive nav-link"
              }
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link nav-bar" : "inactive nav-link"
              }
              to="/register"
            >
              SignUp
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link nav-bar" : "inactive nav-link"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
