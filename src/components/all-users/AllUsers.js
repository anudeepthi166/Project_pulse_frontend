import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import "./AllUsers.css";
import { Table } from "react-bootstrap";

function AllUsers() {
  let [users, setUsers] = useState([]);
  let [error, setError] = useState("");
  let navigate = useNavigate();

  let { userObj, loginStatus } = useSelector((state) => state.login);

  //get the token
  let token = sessionStorage.getItem("token");
  //get Users
  const getUsers = async () => {
    //check Token
    if (token === null) {
      navigate("/login");
    } else {
      try {
        //get request
        let response = await axios.get(
          "http://localhost:4000/Pulse/employee/getAllUsers",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        if (response.status === 200) {
          setUsers(response.data.payload);
        }
      } catch (err) {
        setError(err);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //navigate to Assign Role
  const navigateToAssignRole = (userObj) => {
    navigate(`/super-admin/${userObj.email}/assign-role`, { state: userObj });
  };

  return (
    <div>
      {/* <div>Super Admin</div> */}
      <div className="container mt-5">
        <p className="text-center users-heading ">Users Details</p>
        {error && <p className="text-danger fw-bold text-center">{error}</p>}
        <div className="container table-responsive mt-4">
          <Table responsive striped bordered hover className="text-center">
            <thead className="users-thead">
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Assign</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userObj, index) => {
                return (
                  <tr key={index}>
                    <td>{userObj.email}</td>
                    <td>{userObj.employeeName}</td>
                    <td>{userObj.role}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning edit-btn btn-sm text-dark"
                        onClick={() => navigateToAssignRole(users[index])}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                        </svg>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger text-dark del-btn btn-sm"
                        // onClick={() => navigateToAssignRole(users[index])}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
