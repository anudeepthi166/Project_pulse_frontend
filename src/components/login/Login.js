import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { userLogin } from "../../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { NavLink } from "react-router-dom";
import "./Login.css";

function Login() {
  //get state from redux store
  let { userObj, errorMessage, loginStatus } = useSelector(
    (state) => state.login
  );
  let [status, setStatus] = useState();
  console.log(status);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  //useForm hook
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //onForm Submit
  const onFormSubmit = (userCredObj) => {
    console.log("submitted", loginStatus);
    setStatus(false);
    console.log(userCredObj);
    dispatch(userLogin(userCredObj));
  };
  //useEffect Hook
  useEffect(() => {
    if (loginStatus === "idle") {
      navigate("/login");
    }
    if (errorMessage !== "") {
      setStatus(true);
    }
    if (loginStatus === "success") {
      setStatus(true);
      // setStatus(loginStatus);
      // superAdmin
      if (userObj.role === "superAdmin")
        navigate(`/super-admin/${userObj.email}`);
      // admin User
      if (userObj.role === "adminUser") {
        navigate(`/admin-user/${userObj.email}`);
      }
      // project manager
      else if (userObj.role === "projectManager") {
        navigate(`/project-manager/${userObj.email}`);
      }

      // hrManager
      else if (userObj.role === "hrManager") {
      }

      //gdoHead
      else if (userObj.role === "gdoHead") {
        navigate(`/gdo-head/${userObj.email}`);
      }
    }
  }, [loginStatus]);
  // console.log(errors);
  return (
    <div>
      <NavBar />
      {console.log("-------------------status", status)}

      {/* {status === "idle" && errorMessage && (
        <div className="spinner-border text-success text-center" role="status">
          <span className="sr-only"></span>
        </div>
      )} */}
      <div className="conatiner mx-auto mt-5">
        <p className="text-center login-heading ">Login</p>
        {errorMessage && (
          <p className="text-danger text-center fw-bold">{errorMessage}</p>
        )}
        <div className="row mx-auto">
          {status === false && (
            <div className="spinner-border text-success mx-auto" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </div>
        <div className="col-10 col-sm-7 col-md-5 mx-auto mt-3 login-form p-5">
          {/* form */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/*Email  */}
            <div className="mt-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                placeholder="Enter your mail here ..."
                className="form-control"
              />
              {/* Valiadting Email */}
              {errors.email?.type === "required" && (
                <p className="text-danger fw-bold ">Email is Required</p>
              )}
            </div>

            {/*Password  */}
            <div className="mt-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Enter your mail here ..."
                className="form-control"
              />
              {/* Valiadting Email */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold ">Password is Required</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mt-4 forgot-password fw-bold">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active nav-link " : "inactive nav-link "
                }
                to="/forgot-password"
              >
                Click Here To Reset Your Password
              </NavLink>
              <button className="login-btn float-end" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
