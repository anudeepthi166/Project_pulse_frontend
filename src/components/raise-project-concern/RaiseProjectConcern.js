import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function RaiseProjectConcern() {
  console.log("Raise project Concern");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //state from redux
  let { userObj } = useSelector((state) => state.login);
  let [error, setError] = useState("");
  let [concern, setConcern] = useState("");

  //on Form Submit
  const onFormSubmit = async (concernObj) => {
    //get token
    let token = sessionStorage.getItem("token");

    if (concernObj.concernMitigatedDate === "") {
      delete concernObj["concernMitigatedDate"];
    }
    concernObj.concernRaisedBy = userObj.email;

    try {
      let response = await axios.post(
        `http://localhost:4000/pulse/projectManager/${userObj.email}/projectId/${concernObj.projectId}/concerns`,
        concernObj,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.payload) {
        setConcern(
          `Concern Raised by ${concernObj.concernRaisedBy} reagarding ${concernObj.concernDesc}`
        );
        reset();
        setError("");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="row conatiner mb-5">
      <p className="text-center update-heading pt-5">Raise Concern</p>
      {error && <p className="text-danger text-center fw-bold">{error}</p>}
      {concern && <p className="text-success text-center fw-bold">{concern}</p>}
      <div className="col-10 col-sm-10 col-md-11 mx-auto p-5">
        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="row container ">
            <div className="col-md-5 mx-auto">
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
                {/* {Validations} */}
                {errors.projectId?.type === "required" && (
                  <p className="text-danger fw-bold">project id is required</p>
                )}
              </div>
              {/* Concern  desc*/}
              <div className="mt-3">
                <label htmlFor="concernDesc" className="form-label">
                  Description
                </label>
                <textarea
                  rows="3"
                  {...register("concernDesc", { required: true })}
                  className="form-control"
                />
                {/* {Validations} */}
                {errors.concernDesc?.type === "required" && (
                  <p className="text-danger fw-bold">
                    concern desc is required
                  </p>
                )}
              </div>
              {/* Raised Date */}
              <div className="mt-3">
                <label htmlFor="concernRaisedOn" className="form-label">
                  Concern Raised On
                </label>
                <input
                  type="date"
                  {...register("concernRaisedOn", { required: true })}
                  className="form-control"
                />
                {/* {Validations} */}
                {errors.concernRaisedOn?.type === "required" && (
                  <p className="text-danger fw-bold">date is mandatory</p>
                )}
              </div>
              {/* Raised By
          <div className="mt-3">
            <label htmlFor="concernRaisedBy" className="form-label">
              {/* Raised By
            </label>
            <input
              type="text"
              {...register("concernRaisedBy", { required: true })}
              className="form-control"
            />
          </div> */}
              {/* Severity */}
              <div className="mt-3">
                <label htmlFor="concernSeverity" className="form-label">
                  Severity
                </label>
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("concernSeverity")}
                >
                  <option defaultChecked disabled>
                    --- Select ---
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                {/* {Validations} */}
                {errors.concernSeverity?.type === "required" && (
                  <p className="text-danger fw-bold">
                    concern Severity is mandatory
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-5 mx-auto">
              {/* Indicator */}
              <div className="mt-3">
                <label htmlFor="concernIndicator" className="form-label">
                  Concern Indicator
                </label>
                <input
                  type="text"
                  {...register("concernIndicator", { required: true })}
                  className="form-control"
                />
                {/* {Validations} */}
                {errors.concernIndicator?.type === "required" && (
                  <p className="text-danger fw-bold">
                    Concern Indicator is mandatory
                  </p>
                )}
              </div>
              {/* Raised From Client */}
              <div className="mt-3">
                <label htmlFor="concernRaisedFromClient" className="form-label">
                  Concern Raised From Client
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("concernRaisedFromClient")}
                >
                  <option defaultChecked disabled>
                    --- Select ---
                  </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              {/* Raised STatus */}
              <div className="mt-3">
                <label htmlFor="concernStatus" className="form-label">
                  Concern Status
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("concernStatus")}
                >
                  <option defaultChecked disabled>
                    --- Select ---
                  </option>
                  <option value="raised">Raised</option>
                  <option value="remediation">Remediation</option>
                  <option value="suggested">Suggested</option>
                  <option value="mitigated">Mitigated</option>
                </select>
                {/* {Validations} */}
                {errors.concernStatus?.type === "required" && (
                  <p className="text-danger fw-bold">
                    concern Status is mandatory
                  </p>
                )}
              </div>
              {/* Mitigated Date */}
              <div className="mt-3">
                <label htmlFor="concernMitigatedDate" className="form-label">
                  Concern Mitigated Date
                </label>
                <input
                  type="date"
                  {...register("concernMitigatedDate")}
                  className="form-control"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button className="button add-btn  float-end">
                Raise Concern
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RaiseProjectConcern;
