import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import ProjectManagerLeftSideMenu from "../projectmanagerleftsidemenu/ProjectManagerLeftSideMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectManagerRootLayout() {
  let { userObj, loginStatus } = useSelector((state) => state.login);
  let navigate = useNavigate();
  return (
    <div>
      {loginStatus === "idle" || ("" && navigate("/login"))}
      <div>
        <div>
          <div className="header">
            <Header />
          </div>
          <div className="row ">
            {/* left side menu */}
            <div className="col-md-2  menu text-center">
              <ProjectManagerLeftSideMenu />
            </div>
            {/* Outlet */}
            <div className="col-md-9">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectManagerRootLayout;
