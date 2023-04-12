import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AdminLeftSideMenu.css";

function AdminLeftSideMenu() {
  // navigate
  let navigate = useNavigate();

  return (
    <div className="left-side-menu pt-3" style={{ minHeight: "100vh" }}>
      {/* side menu */}
      <ul className="nav  flex-column">
        {/* Create project */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link side-menu" : "inactive nav-link"
            }
            to="create-project"
          >
            Project
          </NavLink>
        </li>
        {/* portfolo dashboard */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link side-menu" : "inactive nav-link"
            }
            to="portfolio-dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        {/* resource request */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link side-menu" : "inactive nav-link"
            }
            to="resource-requests"
          >
            Resource Requests
          </NavLink>
        </li>
        {/* project concerns */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link side-menu" : "inactive nav-link"
            }
            to="project-concerns"
          >
            Concerns
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminLeftSideMenu;
