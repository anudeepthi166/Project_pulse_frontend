import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./AddTeam.css";

function AddTeam() {
  // state from redux
  let { userObj, loginStatus } = useSelector((state) => state.login);

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let [error, setError] = useState("");
  let [message, setMessage] = useState("");

  const onFormSubmit = async (teamObj) => {
    if (teamObj.endDate === "") {
      delete teamObj["endDate"];
    }
    try {
      //get token
      let token = sessionStorage.getItem("token");

      // api call
      let response = await axios.post(
        `http://localhost:4000/pulse/gdoHead/${userObj.email}/teamMembers`,
        teamObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // successfully created
      if (response.status === 201) {
        setMessage(response.data.message);
        setError("");
        reset();
      }
      // not created
      else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    // component
    <div>
      <div className="row conatiner mb-5">
        <p className="text-center team-head mt-3">Adding Team</p>
        {/* error AND messages */}
        {error && <p className="text-center text-danger fw-bold">{error}</p>}
        {message && (
          <p className="text-center text-success fw-bold">{message}</p>
        )}
        <div className="col-10 col-sm-10 col-md-11 mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="row container">
              <div className="col-md-5 mx-auto">
                {/* Email */}
                <div className="mt-3">
                  <label htmlFor="email" className="form-label">
                    Email<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    className="form-control"
                    placeholder="Enter email ...."
                  />
                  {/* Validations */}
                  {errors.email?.type === "required" && (
                    <p className="text-danger fw-bold">Email is required</p>
                  )}
                </div>
                {/*projectId */}
                <div className="mt-3">
                  <label htmlFor="projectId" className="form-label">
                    Project Id<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="number"
                    {...register("projectId", { required: true })}
                    className="form-control"
                    placeholder="Enter project id ...."
                  />
                  {/* Validations */}
                  {errors.projectId?.type === "required" && (
                    <p className="text-danger fw-bold">
                      Project Id is required
                    </p>
                  )}
                </div>
                {/* role */}
                <div className="mt-3">
                  <label htmlFor="role" className="form-label">
                    Role<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    {...register("role", { required: true })}
                    className="form-control"
                    placeholder="Enter Role...."
                  />
                  {/* Validations */}
                  {errors.role?.type === "required" && (
                    <p className="text-danger fw-bold">Role is required</p>
                  )}
                </div>
                {/* Start Date */}
                <div className="mt-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date<span className="text-danger"> *</span>
                  </label>
                  <input
                    type="date"
                    {...register("startDate", { required: true })}
                    className="form-control"
                    placeholder="Select Start Date"
                  />
                  {/* Validations */}
                  {errors.startDate?.type === "required" && (
                    <p className="text-danger fw-bold">
                      Start Date is required
                    </p>
                  )}
                </div>
                {/* End Date */}
                <div className="mt-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("endDate")}
                    className="form-control"
                    defaultValue={null}
                  />
                </div>
              </div>
              <div className="col-md-5 ms-5">
                {/* Status */}
                <div className="mt-3">
                  <label htmlFor="status" className="form-label">
                    Status <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("status")}
                  >
                    <option defaultChecked disabled>
                      --- Status---
                    </option>
                    <option value="Active">Active</option>
                    <option value="In active">In active</option>
                  </select>
                </div>
                {/* Exposed to client*/}
                <div className="mt-3">
                  <label htmlFor="exposedToClient" className="form-label">
                    Exposed To Client <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("exposedToClient")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
                {/* Billed STatus*/}
                <div className="mt-3">
                  <label htmlFor="billingStatus" className="form-label">
                    Billed Status <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("billingStatus")}
                  >
                    <option defaultChecked disabled>
                      --- Select ---
                    </option>
                    <option value="billed">Billed</option>
                    <option value="buffer">Buffer</option>
                  </select>
                </div>

                {/* Allocation Type*/}
                <div className="mt-3">
                  <label htmlFor="allocationType" className="form-label">
                    Allocation Type <span className="text-danger"> *</span>
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("allocationType")}
                  >
                    <option defaultChecked disabled>
                      --- Allocation Type---
                    </option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button className="button add-btn float-end ms-3" type="submit">
                  Add To Team
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

export default AddTeam;
