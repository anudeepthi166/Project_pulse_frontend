import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function EditProjectConcern() {
  // state from another component
  let { state } = useLocation();

  // setting Date
  let raisedDate =
    state.concernRaisedOn.split("-")[0] +
    "-" +
    state.concernRaisedOn.split("-")[1] +
    "-" +
    state.concernRaisedOn.split("-")[2].split("T")[0];

  // state for error messages
  let [error, setError] = useState("");
  let [res, setRes] = useState({});

  let { userObj, loginStatus } = useSelector((state) => state.login);

  let navigate = useNavigate();
  // useForm hook
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //state for Modal
  let [showModal, setShowModal] = useState(true);
  // const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    navigate(`/project-manager/${userObj.email}/portfolio-dashboard`);
  };

  //onFormSubmit
  const onFormSubmit = async (concernObj) => {
    concernObj.concernId = state.concernId;
    let token = sessionStorage.getItem("token");
    if (concernObj.concernMitigatedDate === "") {
      delete concernObj["concernMitigatedDate"];
    }
    concernObj.concernRaisedBy = userObj.email;

    try {
      // api call to role mapping by super admin
      let response = await axios.put(
        `http://localhost:4000/pulse/projectManager/${userObj.email}/projectId/${state.projectId}/concerns`,
        concernObj,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      setError(err.message);
      setRes({});
    } finally {
      // closeModal
      closeModal();
    }
  };

  //useEffect To set values
  useEffect(() => {
    setValue("concernDesc", state.concernDesc);
    setValue("concernMitigatedDate", state.concernMitigatedDate);
    setValue(
      "concernRaisedFromClient",
      state.concernRaisedFromClient === "Yes" ? 1 : 0
    );
    //setting date
    setValue("concernRaisedOn", raisedDate);
    // setValue("concernRaisedOn",);
    setValue("concernSeverity", state.concernSeverity);
    setValue("concernStatus", state.concernStatus);
  }, []);

  return (
    <div>
      <div>
        {/* error displaying */}
        {Object.keys(error) && (
          <div>
            {" "}
            <p className="text-danger text-center fw-bold mt-5">{error}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Concern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Assign Role Form */}

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="row container ">
              <div className="col-md-5 mx-auto">
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
                {/* Raised From Client */}
                <div className="mt-3">
                  <label
                    htmlFor="concernRaisedFromClient"
                    className="form-label"
                  >
                    Concern Raised From Client
                  </label>
                  <select
                    class="form-select form-select-sm"
                    aria-label=".form-select-sm "
                    {...register("concernRaisedFromClient")}
                  >
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
                    Concern Mitigated On Date
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
                <button className="button add-btn  float-end">Edit</button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() =>
              navigate(`/project-manager/${userObj.email}/portfolio-dashboard`)
            }
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProjectConcern;
