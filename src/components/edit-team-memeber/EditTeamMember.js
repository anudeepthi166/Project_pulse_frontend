import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

function EditTeamMember() {
  // state from another component
  let { state } = useLocation();

  // setting Date
  let startDate =
    state.startDate.split("-")[0] +
    "-" +
    state.startDate.split("-")[1] +
    "-" +
    state.startDate.split("-")[2].split("T")[0];

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
    navigate(`/gdo-head/${userObj.email}/portfolio-dashboard`);
  };

  //onFormSubmit
  const onFormSubmit = async (teamMember) => {
    let token = sessionStorage.getItem("token");
    if (teamMember.endDate === "") {
      delete teamMember["endDate"];
    }
    try {
      // api call to role mapping by super admin
      let response = await axios.put(
        `http://localhost:4000/pulse/gdoHead/${userObj.email}/teamMembers`,
        teamMember,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // succesufully edit details
      if (response.status === 201) {
        setRes(response.data.message);
        setError("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      setRes({});
    } finally {
      // closeModal
      closeModal();
    }
  };

  //setting values to form by using useEffect
  useEffect(() => {
    setValue("email", state.email);
    setValue("projectId", state.projectId);
    setValue("role", state.role);
    setValue("startDate", startDate);
    setValue("allocationType", state.allocationType);
    setValue("exposedToClient", state.exposedToClient === "Yes" ? 1 : 0);
    setValue("status", state.status);
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
          <Modal.Title>Edit Team Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Assign Role Form */}

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
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button className="button add-btn float-end ms-3" type="submit">
                  Edit
                </button>
                <button className="button resetBtn float-end ms-3" type="reset">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() =>
              navigate(`/gdo-head/${userObj.email}/portfolio-dashboard`)
            }
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditTeamMember;
