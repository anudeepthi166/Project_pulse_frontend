import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function RaiseResourceRequest() {
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //state from redux
  let { userObj } = useSelector((state) => state.login);
  let [error, setError] = useState("");
  let [raised, setRaised] = useState("");

  //on Form Submit
  const onFormSubmit = async (projectObj) => {
    //get token
    let token = sessionStorage.getItem("token");

    let body = projectObj;
    projectObj.requestRaisedBy = userObj.email;
    try {
      let response = await axios.post(
        `http://localhost:4000/pulse/gdoHead//${userObj.email}/projectId/${projectObj.projectId}/resourceRequest`,
        projectObj,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.payload) {
        setRaised(
          `Resource Request Raised by ${projectObj.requestRaisedBy} reagarding ${projectObj.resourceDesc}`
        );
        reset();
        setError("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      setRaised("");
    }
  };
  return (
    <div className="row conatiner mb-5">
      <p className="text-center update-heading mt-5">Raise Resource Request</p>
      {error && <p className="text-danger text-center fw-bold">{error}</p>}
      {raised && <p className="text-success text-center fw-bold">{raised}</p>}
      <div className="col-10 col-sm-8 col-md-6 mx-auto">
        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          {/* Project Id */}
          <div className="mt-3">
            <label htmlFor="projectId" className="form-label">
              project Id
            </label>
            <input
              type="number"
              {...register("projectId", { required: true })}
              className="form-control"
            />
            {/* <select
              class="form-select form-select-sm"
              aria-label=".form-select-sm "
              {...register("projectId")}
            ></select> */}

            {}
          </div>
          {/* Resource Request  desc*/}
          <div className="mt-3">
            <label htmlFor="resourceDesc" className="form-label">
              Description <span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              {...register("resourceDesc", { required: true })}
              className="form-control"
            />
            {/* {Validations} */}
            {errors.resourceDesc?.type === "required" && (
              <p className="text-danger fw-bold">Resource Desc is required</p>
            )}
          </div>
          {/* Raised By
          <div className="mt-3">
            <label htmlFor="requestRaisedBy" className="form-label">
              Raised By
            </label>
            <input
              type="text"
              {...register("requestRaisedBy", { required: true })}
              className="form-control"
            />
          </div> */}

          {/* Submit Button */}
          <div className="mt-3">
            <button className="button add-btn  float-end">
              Raise Resource Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RaiseResourceRequest;
