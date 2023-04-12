import React, { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

function AssignRole() {
  //state from AllUsers
  let { state } = useLocation();
  let [error, setError] = useState("");
  let [res, setRes] = useState({});

  let { userObj, loginStatus } = useSelector((state) => state.login);

  let navigate = useNavigate();
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
    // navigate("/super-admin/abcd@westagilelabs.com");
  };

  //onFormSubmit
  const onFormSubmit = async (user) => {
    let token = sessionStorage.getItem("token");
    try {
      // api call to role mapping by super admin
      let response = await axios.put(
        "http://localhost:4000/Pulse/employee/roleMapping",
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // succesufully role mapped
      if (response.data.payload) {
        setRes(response.data);
        setError("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
      setRes({});
    }

    // closeModal
    closeModal();
  };

  //useEffect
  useEffect(() => {
    setValue("email", state.email);
    setValue("role", state.role);
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
        {/* message displaying */}
        {Object.keys(res).length !== 0 && (
          <div>
            <div className="text-success text-center fw-bold">
              <p>{res.message}</p>
              <p>
                {res.payload[0]}
                <span className="text-dark"> ----> </span>
                {res.payload[1]}
              </p>
            </div>
          </div>
        )}
        {/* Button to get users list */}
        <div className="container mx-auto bg-success ms-5">
          <button
            className="btn btn-outline-primary mx-auto mt-2 float-end"
            onClick={() => navigate(`/super-admin/${userObj.email}/get-users`)}
          >
            Users List
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Assign Role Form */}

          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Email */}
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                {...register("email")}
                className="form-control"
                disabled
              />
            </div>
            {/* Role */}
            <div className="mt-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm "
                {...register("role")}
              >
                <option defaultChecked disabled>
                  --- Select Role ---
                </option>
                <option value="adminUser">Admin User</option>
                <option value="gdoHead">Gdo Head</option>
                <option value="projectManager">Project Manger</option>
                <option value="hrManager">Hr Manger</option>
                <option value="superAdmin">Super Admin</option>
              </select>
            </div>
            <div className="mt-3 float-end">
              <button className="btn btn-success" type="submit">
                Assign Role
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => navigate(`/super-admin/${userObj.email}/get-users`)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssignRole;
