import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

function EditProject() {
  let { state } = useLocation();
  let [error, setError] = useState("");
  let [res, setRes] = useState({});
  let { userObj, loginStatus } = useSelector((state) => state.login);

  console.log(state);

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  // set values
  useEffect(() => {
    setValue("projectName", state.projectName);
    setValue("gdoHead", state.gdoHead);
    setValue("projectManager", state.projectManager);

    setValue("projectStatus", state.projectStatus);
    setValue("projectStartDate", state.projectStartDate);
    setValue("projectEndDate", state.projectEndDate);
    setValue("projectFitnessIndicator", state.projectFitnessIndicator);
    setValue("projectDomain", state.projectDomain);
    setValue("projectType", state.projectType);
  }, []);

  //state for Modal
  let [showModal, setShowModal] = useState(true);
  // const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    navigate(`/admin-user/${userObj.email}/portfolio-dashboard`);
    // navigate("/super-admin/abcd@westagilelabs.com");
  };

  // get the token
  let token = sessionStorage.getItem("token");

  // on form submit
  const onFormSubmit = async (projectObj) => {
    console.log("Project Object From Modal", projectObj);
    if (projectObj.projectEndDate === "") {
      delete projectObj["projectEndDate"];
    }
    //make api call
    let res = await axios.put(
      `http://localhost:4000/pulse/admin/${userObj.email}/project/${state.projectId}`,
      projectObj,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Updated Response", res);
    closeModal();
    navigate(`/admin-user/${userObj.email}/portfolio-dashboard`);
  };
  return (
    <div>
      <Modal
        size="lg"
        show={showModal}
        onHide={closeModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Edit Project Form */}
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
                    {...register("projectName")}
                    className="form-control"
                    placeholder="Enter project name ..."
                  />
                </div>
                {/* GDO Head */}
                <div className="mt-3">
                  <label htmlFor="gdoHead" className="form-label">
                    Gdo Head
                  </label>
                  <input
                    type="text"
                    {...register("gdoHead")}
                    className="form-control"
                    placeholder="Gdo Head email ..."
                  />
                </div>
                {/* Project Manager */}
                <div className="mt-3">
                  <label htmlFor="projectManager" className="form-label">
                    Project Manager
                  </label>
                  <input
                    type="text"
                    {...register("projectManager")}
                    className="form-control"
                    placeholder="Project Manager email ..."
                  />
                </div>
                {/* Client Id
                <div className="mt-3">
                  <label htmlFor="clientId" className="form-label">
                    Client Email
                  </label>
                  <input
                    type="number"
                    {...register("clientId")}
                    className="form-control"
                    placeholder="client Id ..."
                  />
                </div> */}
                {/* Project Status */}
                <div className="mt-3">
                  <label htmlFor="projectStatus" className="form-label">
                    Project Status
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="projectStatus"
                    placeholder="Project Status"
                  >
                    <option defaultChecked disabled>
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
                    {...register("projectStartDate")}
                    className="form-control"
                    placeholder="Choose Start Date ..."
                  />
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
                  <label
                    htmlFor="projectFitnessIndicator"
                    className="form-label"
                  >
                    Project Fitness Indicator
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    id="fitnessIndicator"
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
                    {...register("projectDomain")}
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
                    id="projectType"
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
                  Edit Project
                </button>
                <button className="button resetBtn float-end ms-3" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProject;
