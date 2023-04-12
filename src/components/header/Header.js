import React from "react";
import { NavLink } from "react-router-dom";
import { clearState } from "../../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  //get the state from rdeux
  let { userObj, loginStatus } = useSelector((state) => state.login);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //onLogout function
  const onLogout = () => {
    //call clearSTate reducer
    dispatch(clearState());
  };
  return (
    <div className="  header">
      <div>
        <ul className="nav justify-content-end">
          {/* user-email */}
          <li className="nav-item ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link nav-bar" : "inactive nav-link"
              }
              to="/user-profile"
            >
              {userObj.email}
            </NavLink>
          </li>
          {/* logout */}
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "active nav-link nav-bar" : "inactive nav-link"
              }
              to="/login"
              onClick={onLogout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
