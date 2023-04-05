import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

function CreateProject() {
  let [error, setError] = useState("");
  let { userObj } = useSelector((state) => state.login);
  console.log("create Project");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let navigate = useNavigate();

  //on Form Submit
  const onFormSubmit = async (projectObj) => {
    //get the token
    let token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
    // let projectStatus = document.querySelector("#projectStatus").value;
    // let projectFitnessIndicator =
    //   document.querySelector("#fitnessIndicator").value;
    // let projectType = document.querySelector("#projectType").value;
    // projectObj.projectStatus = projectStatus;
    // projectObj.projectFitnessIndicator = projectFitnessIndicator;
    // projectObj.projectType = projectType;
    console.log("-------Form Data", projectObj);
    if (projectObj.projectEndDate === "") {
      delete projectObj["projectEndDate"];
    }

    try {
      let response = await axios.post(
        `http://localhost:4000/pulse/admin/${userObj.email}/project`,
        projectObj,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.status === 201) {
        reset();
        navigate("../portfolio-dashboard");
      }
      // } else if (!response) {
      //   throw new Error("Please recheck Gdo Head and project Manager emails");
      // }
      else {
        setError("Please Recheck Client Id ");
      }
    } catch (err) {
      console.log(err);

      setError(err.response.data.message);
    }
  };
  console.log(error);
  return (
    <div className="row conatiner mb-5 mt-4">
      <p className="text-center create-heading ">Create Project</p>
      {error && <p className="text-danger text-center fw-bold">{error}</p>}
      <div className="col-10 col-sm-10 col-md-11 mx-auto create-project-form p-5">
        {/* Form */}

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="row container ">
            <div className="col-md-5 mx-auto">
              {/* Project Name */}
              <div className="mt-3">
                <label htmlFor="projectName" className="form-label">
                  Project name
                </label>
                <input
                  type="text"
                  {...register("projectName", { required: true })}
                  className="form-control"
                  placeholder="Enter project name ..."
                />
                {/* Validation */}
                {errors.projectName?.type === "required" && (
                  <p className="text-danger fw-bold">
                    Project Name is required
                  </p>
                )}
              </div>
              {/* GDO Head */}
              <div className="mt-3">
                <label htmlFor="gdoHead" className="form-label">
                  Gdo Head
                </label>
                <input
                  type="text"
                  {...register("gdoHead", { required: true })}
                  className="form-control"
                  placeholder="Gdo Head email ..."
                />
                {/* Validation */}
                {errors.gdoHead?.type === "required" && (
                  <p className="text-danger fw-bold">
                    gdoHead email is required
                  </p>
                )}
              </div>
              {/* Project Manager */}
              <div className="mt-3">
                <label htmlFor="projectManager" className="form-label">
                  Project Manager
                </label>
                <input
                  type="text"
                  {...register("projectManager", { required: true })}
                  className="form-control"
                  placeholder="Project Manager email ..."
                />
                {/* Validation */}
                {errors.projectManager?.type === "required" && (
                  <p className="text-danger fw-bold">
                    Project Manager email is required
                  </p>
                )}
              </div>
              {/* Client Id */}
              <div className="mt-3">
                <label htmlFor="clientId" className="form-label">
                  Client Id
                </label>
                <input
                  type="number"
                  {...register("clientId", { required: true })}
                  className="form-control"
                  placeholder="Client Id ..."
                />
                {/* Validation */}
                {errors.clientId?.type === "required" && (
                  <p className="text-danger fw-bold">Client Id is required</p>
                )}
              </div>
              {/* Project Status */}
              <div className="mt-3">
                <label htmlFor="projectStatus" className="form-label">
                  Project Status
                </label>
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("projectStatus")}
                  placeholder="Project Status"
                  defaultValue="--- Project Status ---"
                >
                  <option value="--- Project Status ---" disabled>
                    --- Project Status ---
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
            </div>
            <div className="col-md-5 ms-5">
              {/* Project Start Date */}
              <div className="mt-3">
                <label htmlFor="projectStartDate" className="form-label">
                  Project Start Date
                </label>
                <input
                  type="date"
                  {...register("projectStartDate", { required: true })}
                  className="form-control"
                  placeholder="Choose Start Date ..."
                />
                {/* Validation */}
                {errors.projectStartDate?.type === "required" && (
                  <p className="text-danger fw-bold">
                    project StartDate is required
                  </p>
                )}
              </div>
              {/* Project End Date */}
              <div className="mt-3">
                <label htmlFor="projectEndDate" className="form-label">
                  Project End Date
                </label>
                <input
                  type="date"
                  {...register("projectEndDate")}
                  className="form-control"
                  defaultValue={null}
                  placeholder="Choose End Date ..."
                />
              </div>
              {/* Project Fitness Indicator */}
              <div className="mt-3">
                <label htmlFor="projectFitnessIndicator" className="form-label">
                  Project Fitness Indicator
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("projectFitnessIndicator")}
                >
                  <option defaultChecked disabled>
                    --- Project Fitness Indicator ---
                  </option>
                  <option value="red">Red</option>
                  <option value="amber">Amber</option>
                  <option value="green">Green</option>
                </select>
              </div>
              {/* Project Domain */}
              <div className="mt-3">
                <label htmlFor="projectDomain" className="form-label">
                  Project Domain
                </label>
                <input
                  type="text"
                  {...register("projectDomain", { required: true })}
                  className="form-control"
                  placeholder="Project Domain..."
                />
              </div>
              {/* Project Type */}
              <div className="mt-3">
                <label htmlFor="projectType" className="form-label">
                  Project Type
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm "
                  {...register("projectType")}
                >
                  <option defaultChecked disabled>
                    --- Project Type---
                  </option>
                  <option value="Development">Development</option>
                  <option value="Devops">Devops</option>
                  <option value="Test Automation">Test Automation</option>
                  <option value="Performance Testing">
                    Performance Testing
                  </option>
                  <option value="Security">Security</option>
                  <option value="Sustenance Engineering">
                    Sustenance Engineering
                  </option>
                  <option value="Mobility">Mobility</option>
                  <option value="Storage">Storage</option>
                </select>
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-4">
              <button className="button add-btn float-end ms-3" type="submit">
                Add Project
              </button>
              <button className="button resetBtn float-end ms-3" type="reset">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
