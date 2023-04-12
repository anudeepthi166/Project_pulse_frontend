import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./AddProjectUpdate.css";

function AddProjectUpdate() {
  // state from redux
  let { userObj, loginStatus } = useSelector((state) => state.login);

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // state
  let [error, setError] = useState("");
  let [message, setMessage] = useState("");

  const onFormSubmit = async (updateObj) => {
    try {
      //get token
      let token = sessionStorage.getItem("token");

      // post request
      let response = await axios.post(
        `http://localhost:4000/pulse/projectManager/${userObj.email}/projectId/${updateObj.projectId}/projectUpdates`,
        updateObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // check for payload
      if (response.data.payload) {
        reset();
        setMessage(response.data.message);
        setError("");
      }
      //if payload doesn't exists throw error
      else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <div className="row conatiner mb-5 mt-4">
        <p className="text-center update-heading pt-2">Add Project Update</p>
        {error && <p className="text-center text-danger fw-bold">{error}</p>}
        {message && (
          <p className="text-center text-success fw-bold">{message}</p>
        )}
        <div className="col-10 col-sm-10 col-md-11 mx-auto p-5">
          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="row container ">
              <div className="col-md-5 mx-auto">
                {/*projectId */}
                <div className="mt-3">
                  <label htmlFor="projectId" className="form-label">
                    Project Id<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="number"
                    {...register("projectId", { required: true })}
                    className="form-control"
                  />
                  {/* Valiadting project id */}
                  {errors.projectId?.type === "required" && (
                    <p className="text-danger fw-bold ">
                      projectId is Required
                    </p>
                  )}
                </div>
                {/* projectStatusUpdate */}
                <div className="mt-3">
                  <label htmlFor="projectStatusUpdate" className="form-label">
                    Project Status Update<span className="text-danger"> *</span>
                  </label>
                  <textarea
                    rows="4"
                    {...register("projectStatusUpdate")}
                  ></textarea>
                  {/* Valiadting project id */}
                  {errors.projectStatusUpdate?.type === "required" && (
                    <p className="text-danger fw-bold ">
                      Status Update is Required
                    </p>
                  )}
                </div>
                {/*  scheduleStatus */}
                <div className="mt-3">
                  <label htmlFor="scheduleStatus" className="form-label">
                    Schedule Status<span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("scheduleStatus")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="Red">Red</option>
                    <option value="Amber">Amber</option>
                    <option value="Green">Green</option>
                  </select>
                </div>
                {/* Resourcing Status */}
                <div className="mt-3">
                  <label htmlFor="resourcingStatus" className="form-label">
                    Resourcing Status<span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("resourcingStatus")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="Red">Red</option>
                    <option value="Amber">Amber</option>
                    <option value="Green">Green</option>
                  </select>
                </div>
              </div>
              <div className="col-md-5 mx-auto">
                {/* Quality  Status */}
                <div className="mt-3">
                  <label htmlFor="qualityStatus" className="form-label">
                    Quality Status <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("qualityStatus")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="Red">Red</option>
                    <option value="Amber">Amber</option>
                    <option value="Green">Green</option>
                  </select>
                </div>
                {/* Waiting For Clients Inputs*/}
                <div className="mt-3">
                  <label
                    htmlFor="waitingForClientInputs"
                    className="form-label"
                  >
                    Waiting For Client Inputs
                    <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("waitingForClientInputs")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                {/* Update On */}
                <div className="mt-3">
                  <label htmlFor="updatedOn" className="form-label">
                    updated On<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="date"
                    {...register("updatedOn")}
                    className="form-control"
                  ></input>
                  {errors.updatedOn?.type === "required" && (
                    <p className="text-danger fw-bold ">Choose the Date</p>
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button className="button add-btn float-end ms-3" type="submit">
                  Add Update
                </button>
                <button className="button resetBtn float-end ms-3" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectUpdate;
