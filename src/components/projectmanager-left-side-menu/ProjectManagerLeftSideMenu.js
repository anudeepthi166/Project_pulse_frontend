import React from "react";
import { NavLink } from "react-router-dom";

function ProjectManagerLeftSideMenu() {
  return (
    <div className="left-side-menu pt-3" style={{ minHeight: "100vh" }}>
      {" "}
      <div>
        <div>
          <ul className="nav  flex-column">
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
