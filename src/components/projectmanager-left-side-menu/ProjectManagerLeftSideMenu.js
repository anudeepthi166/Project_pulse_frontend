import React from "react";
import { NavLink } from "react-router-dom";

function ProjectManagerLeftSideMenu() {
  return (
    <div className="left-side-menu pt-3" style={{ minHeight: "100vh" }}>
      {" "}
      <div>
        <div>
          {/* side menu */}
          <ul className="nav  flex-column">
            {/* Add Project Update */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "inactive nav-link"
                }
                to="add-project-update"
              >
                Add Project Update
              </NavLink>
            </li>
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "inactive nav-link"
                }
                to="portfolio-dashboard"
              >
                Dashboard{" "}
              </NavLink>
            </li>
            {/* Raise Project Concerns */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "inactive nav-link"
                }
                to="raise-project-concern"
              >
                Raise Project Concerns
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagerLeftSideMenu;
