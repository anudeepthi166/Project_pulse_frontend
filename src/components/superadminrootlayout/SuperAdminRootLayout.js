import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";

function SuperAdminRootLayout() {
  let { userObj, loginStatus } = useSelector((state) => state.login);
  let navigate = useNavigate();
  return (
    <div>
      {loginStatus === "idle" || ("" && navigate("/login"))}
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default SuperAdminRootLayout;
