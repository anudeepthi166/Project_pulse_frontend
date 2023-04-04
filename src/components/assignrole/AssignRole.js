import React, { useState } from "react";

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

  console.log(state);

  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //state for Modal
  let [showModal, setShowModal] = useState(true);
  // const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    // navigate("/super-admin/abcd@westagilelabs.com");
  };

  //onFormSubmit
  const onFormSubmit = async () => {
    var selectedOption = document.querySelector("#role");
    let role = selectedOption.value;

    let token = sessionStorage.getItem("token");
    try {
      let response = await axios.put(
        "http://localhost:4000/Pulse/employee/roleMapping",
        { user: state.email, role: role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("response is ", response);
      if (response.data.payload) {
        console.log("response.data", response.data);
        setRes(response.data);
        setError("");
      } else {
        console.log("throw", response.data.message);
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.log("err is =-----", err.message);

      setError(err.message);
      setRes({});
    }

    // closeModal
    closeModal();
  };
  console.log("error", error);
  console.log("res", Object.keys(res).length);
  return (
    <div>
      <div>
        {Object.keys(error) && (
          <div>
            {" "}
            <p className="text-danger text-center fw-bold mt-5">{error}</p>
          </div>
        )}
        {Object.keys(res).length !== 0 && (
          <div>
            <div className="text-success text-center fw-bold">
              <p>{res.message}</p>
              <p>
                {res.payload[0]}
                <span className="text-dark"> ----> </span>
                {res.payload[1]}
              </p>
              {/* <button className="btn btn-warning">Get All Users</button> */}
            </div>
          </div>
        )}
        <div className="container mx-auto bg-success ms-5">
          <button
            className="btn btn-outline-primary mx-auto mt-2 float-end"
            onClick={() => navigate(`/super-admin/${userObj.email}/get-users`)}
          >
            Users List
          </button>
        </div>
      </div>
      {/* {console.log("-------------------", res)} 

        {/* {message.length && (
          <div className="text-success text-center fw-bold">
            <p>{message.message}</p>
            <p>
              {message.payload[0]}
              <span className="text-dark"> ----> </span>
              {message.payload[1]}
            </p>
          </div>
        )} 
      </div> */}
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
                defaultValue={state.email}
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
                id="role"
              >
                <option defaultChecked disabled>
                  --- Select Role ---
                </option>
                <option value="adminUser">Admin User</option>
                <option value="gdoHead">Gdo Head</option>
                <option value="projectManager">Project Manger</option>
                <option value="hrManager">Hr Manger</option>
                <option value="superAdmin">Super Manger</option>
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
          <Button variant="warning" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssignRole;
