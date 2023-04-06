import React from "react";
//import Componenets
import "./RootLayout.css";

import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="main">
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
