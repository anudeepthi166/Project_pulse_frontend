import Header from "../header/Header";
import GdoHeadLeftSideMenu from "../gdoheadleftsidemenu/GdoHeadLeftSideMenu";
import { Outlet } from "react-router-dom";
import "./GdoHeadRootLayout.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function GdoHeadRootLayout() {
  let { userObj, loginStatus } = useSelector((state) => state.login);
  let navigate = useNavigate();
  return (
    <div>
      {loginStatus === "idle" || ("" && navigate("/login"))}
      <div>
        <div className="header">
          <Header />
        </div>
        <div className="row">
          {/* left side menu */}
          <div className="col-md-2  menu text-center ">
            <GdoHeadLeftSideMenu />
          </div>
          {/* Outlet */}
          <div className="col-md-9  mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GdoHeadRootLayout;
