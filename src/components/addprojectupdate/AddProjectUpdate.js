import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./AddProjectUpdate.css";

function AddProjectUpdate() {
  // state from redux
  let { userObj, loginStatus } = useSelector((state) => state.login);
  // console.log(userObj.email);
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let [error, setError] = useState("");
  let [message, setMessage] = useState("");

  const onFormSubmit = async (updateObj) => {
    console.log(updateObj);
    updateObj.projectStatusUpdate = document.querySelector(
      "#projectStatusUpdate"
    ).value;
    updateObj.scheduleStatus = document.querySelector("#scheduleStatus").value;
    updateObj.qualityStatus = document.querySelector("#qualityStatus").value;

    updateObj.waitingForClientInputs = document.querySelector(
      "#waitingForClientInputs"
    ).value;
    updateObj.resourcingStatus =
      document.querySelector("#resourcingStatus").value;
    console.log("------", updateObj);
    try {
      //get token
      let token = sessionStorage.getItem("token");
      console.log(token);
      // console.log(userObj.email);

      let response = await axios.post(
        `http://localhost:4000/pulse/projectManager/${userObj.email}/projectId/${updateObj.projectId}/projectUpdates`,
        updateObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      if (response.data.payload) {
        reset();
        setMessage(response.data.message);
        setError("");
      } else {
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
                    Project Id
                  </label>
                  <input
                    type="number"
                    {...register("projectId", { required: true })}
                    className="form-control"
                  />
                </div>
                {/* projectStatusUpdate */}
                <div className="mt-3">
                  <label htmlFor="projectStatusUpdate" className="form-label">
                    Project Status Update
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="projectStatusUpdate"
                  >
                    <option defaultChecked disabled>
                      --- Select Status ---
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Pre Sales">Pre-Sales</option>
                    <option value="Client Sign Off">Client Sign Off</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>
                {/* Start scheduleStatus */}
                <div className="mt-3">
                  <label htmlFor="scheduleStatus" className="form-label">
                    Schedule Status
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="scheduleStatus"
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
                    Resourcing Status
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="resourcingStatus"
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
                    Quality Status
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="qualityStatus"
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
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="waitingForClientInputs"
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
                    updated On
                  </label>
                  <input
                    type="date"
                    {...register("updatedOn")}
                    className="form-control"
                  ></input>
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
