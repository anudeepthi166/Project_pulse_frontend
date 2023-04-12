import { NavLink, Outlet } from "react-router-dom";
import AdminLeftSideMenu from "../admin-left-side-menu/AdminLeftSideMenu";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AdminRootLayout.css";
function AdminRootLayout() {
  let { userObj, loginStatus } = useSelector((state) => state.login);
  let navigate = useNavigate();

  return (
    <div>
      {loginStatus === "idle" || ("" && navigate("/login"))}
      <div>
        {/* header */}
        <div className="header ">
          <div className="">
            <Header />
          </div>
        </div>
        <div className="row">
          {/* left side menu */}

          <div className="col-md-2  menu text-center ">
            <AdminLeftSideMenu />
          </div>
          {/* Outlet */}
          <div className="col-md-9 ">
            <Outlet />
          </div>
        </div>
      </div>
      )
    </div>
  );
}

export default AdminRootLayout;
