import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  let email = "";
  let navigate = useNavigate();
  let [resetBtn, setResetBtn] = useState(false);
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let [error, setError] = useState("");

  //form submit
  const onFormSubmit = async (userObj) => {
    email = userObj.email;
    console.log(userObj);
    try {
      let response;
      if (userObj.otp) {
        response = await axios.put(
          `http://localhost:4000/pulse/employee/${userObj.email}/resetPassword`,
          userObj
        );
        reset();
        navigate("/login");
      } else {
        response = await axios.post(
          `http://localhost:4000/pulse/employee/${userObj.email}/forgotPassword`,
          userObj
        );
      }
      console.log(response);
      if (response.status === 200) {
        setResetBtn(true);

        setError("");
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="conatiner mx-auto pt-5">
      <p className=" forgot-password-heading text-center">Forgot Password</p>
      {error && <p className="text-danger text-center ">{error}</p>}
      <div className="col-10 col-sm-7 col-md-6 mx-auto mt-3  p-5 forgot-password-form">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Email */}
          <div className="mt-3">
            <lable htmlFor="email" className="form-label">
              Email
            </lable>
            <input
              type="text"
              {...register("email", { required: true })}
              className="form-control"
            />
            {/* Validating email */}
            {console.log(errors)}
            {errors.email?.type === "required" && (
              <p className="text-danger fw-bold">Email is required</p>
            )}
          </div>
          {/* submit Button */}
          <div className="mt-3">
            {!resetBtn && (
              <div className="mt-3">
                {" "}
                <button type="submit" className="reset-btn  float-end">
                  Get OTP
                </button>
              </div>
            )}
          </div>
          <div className="mt-3">
            {resetBtn && (
              <div>
                {/* // OTP */}
                <div className="mt-2">
                  <lable htmlFor="otp" className="form-label">
                    OTP
                  </lable>
                  <input
                    type="text"
                    {...register("otp", { required: true })}
                    className="form-control"
                  />
                  {/* Validating OTP */}
                  {console.log(errors)}
                  {errors.otp?.type === "required" && (
                    <p className="text-danger fw-bold">Please Enter OTP</p>
                  )}
                </div>
                {/* New Password */}
                <div className="mt-2">
                  <lable htmlFor="password" className="form-label">
                    New Password
                  </lable>
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 4 })}
                    className="form-control"
                  />
                  {/* Validating new Password */}
                  {console.log(errors)}
                  {errors.password?.type === "required" && (
                    <p className="text-danger fw-bold">
                      New password is required
                    </p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-danger fw-bold">
                      Password is too short ,minimum Length is 4
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <div className="mt-3">
                  {" "}
                  <button type="submit" className="reset-btn  float-end">
                    Reset Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
