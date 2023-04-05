import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useSelector } from "react-redux";
import "./Register.css";

function Register() {
  //state from redux
  let { loginStatus } = useSelector((state) => state.login);
  let [status, setStatus] = useState(loginStatus);
  //state for invalid username or password
  let [error, setError] = useState("");
  let [result, getResult] = useState();
  //navigate
  let navigate = useNavigate();
  //useForm hook
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //onForm Submit
  const onFormSubmit = async (userObj) => {
    getResult(false);
    console.log(userObj);
    try {
      let user = await axios.post(
        `http://localhost:4000/pulse/employee/${userObj.email}/register`,
        userObj
      );
      console.log("user Response", user);

      if (user.status === 201) {
        getResult(true);
        setError("");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.message);
      getResult(true);
      console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    if (loginStatus === "success") {
      setStatus(loginStatus);
    }
  }, [loginStatus]);
  //console.log(errors);
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container mx-auto mt-5 ">
        <p className="text-center register-heading">Sign Up</p>
        <div className="row mx-auto">
          {result === false && (
            <div className=" spinner-border text-success mx-auto" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </div>
        {error && <p className="text-danger fw-bold text-center">{error}</p>}

        <div className="col-10 col-sm-7 col-md-5 mx-auto mt-3 register-form p-5">
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
            {/*name  */}
            <div className="mt-2">
              <label htmlFor="employeeName" className="form-label">
                Name
              </label>
              <input
                type="text"
                {...register("employeeName", { required: true })}
                placeholder="Enter your name here ..."
                className="form-control"
              />
              {/* Valiadting Name */}
              {errors.employeeName?.type === "required" && (
                <p className="text-danger fw-bold ">Name is Required</p>
              )}
            </div>
            {/*Password  */}
            <div className="mt-2">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 4 })}
                placeholder="Enter your Password here ..."
                className="form-control"
              />
              {/* Valiadting Email */}
              {errors.password?.type === "required" && (
                <p className="text-danger fw-bold ">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-danger fw-bold">Password is too Short</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mt-3">
              <button className="register-btn float-end " type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
