import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./PorfolioDashboard.css";
import Table from "react-bootstrap/Table";

const PorfolioDashboard = () => {
  //get the state from redux store
  let { userObj } = useSelector((state) => state.login);

  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);
  let [error, setError] = useState("");
  let [deleted, setDeleted] = useState(false);
  let [getData, setGetData] = useState(false);

  //state for Modal
  let [showModal, setShowModal] = useState(false);
  // const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };

  //get the token
  let token = sessionStorage.getItem("token");

  // get projects api call
  const getProjects = async () => {
    //if no token
    if (token === null) {
      navigate("/login");
    }
    // Token Exists
    else {
      try {
        let response;
        //get request based on Role
        if (userObj.role === "adminUser") {
          // admin User Api Request
          response = await axios.get(
            `http://localhost:4000/pulse/admin/${userObj.email}/portfolioDashboard`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        // gdoHead APi requset
        else if (userObj.role === "gdoHead") {
          response = await axios.get(
            `http://localhost:4000/pulse/gdoHead/${userObj.email}/portfolioDashboard`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        // project manager API request
        else if (userObj.role === "projectManager") {
          response = await axios.get(
            `http://localhost:4000/pulse/projectManager/${userObj.email}/portfolioDashboard`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        setGetData(true);
        if (response.data.payload) {
          //set Projects

          setProjects(response.data.payload);
          setError("");
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // navigateTo detailed view
  const navigateToDetailedView = (projectId) => {
    if (userObj.role === "adminUser") {
      navigate(
        `/admin-user/${userObj.email}/project-detailed-view/${projectId}`,
        {
          state: {
            projectId: projectId,
            email: userObj.email,
            role: userObj.role,
          },
        }
      );
    }
    if (userObj.role === "gdoHead") {
      navigate(
        `/gdo-head/${userObj.email}/project-detailed-view/${projectId}`,
        {
          state: {
            projectId: projectId,
            email: userObj.email,
            role: userObj.role,
          },
        }
      );
    }
    if (userObj.role === "projectManager") {
      navigate(
        `/project-manager/${userObj.email}/project-detailed-view/${projectId}`,
        {
          state: {
            projectId: projectId,
            email: userObj.email,
            role: userObj.role,
          },
        }
      );
    }
  };

  // delete project api call
  const deleteProject = async (index) => {
    let projectId = projects[index].projectId;

    let res = await axios.put(
      `http://localhost:4000/pulse/admin/${userObj.email}/delete/project/${projectId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
      setDeleted(true);
      getProjects();
    }
  };

  const navigateToEditProject = (index) => {
    navigate(`/admin-user/${userObj.email}/edit-project`, {
      state: projects[index],
    });
  };
  useEffect(() => {
    getProjects();
  }, [deleted]);

  return (
    <div className="mt-5">
      <p className="text-center portfolio-heading ">
        Project Portfolio Dashboard
      </p>
      {error && <p className="text-danger fw-bold text-center">{error}</p>}
      <div className="row mx-auto">
        {!projects.length && getData === false && (
          <div className="spinner-border text-success mx-auto" role="status">
            <span className="sr-only"></span>
          </div>
        )}
        {!projects.length && getData === true && (
          <p className="text-danger fw-bold text-center">
            No Projects were added
          </p>
        )}

        {projects.length !== 0 && (
          <div>
            <div className="text-danger mb-3">
              Click On project name to see detailed view
            </div>
            <Table responsive striped bordered hover className="text-center">
              <thead className="portfolio-thead">
                <tr>
                  <th>Project Id</th>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Client Account Manager</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Fitness Indcator</th>
                  <th>Gdo Head</th>
                  <th>Project Manager</th>

                  {userObj.role === "adminUser" && <th>Edit</th>}
                  {userObj.role === "adminUser" && <th>Delete</th>}
                </tr>
              </thead>
              <tbody>
                {projects.length &&
                  projects.map((projectObj, index) => {
                    return (
                      <tr key={index}>
                        <td>{projectObj.projectId}</td>
                        <td
                          onClick={() =>
                            navigateToDetailedView(projectObj.projectId)
                          }
                        >
                          {projectObj.projectName}
                        </td>
                        <td>{projectObj.client.clientEmail}</td>
                        <td>{projectObj.client.clientAccountManager}</td>
                        <td>{projectObj.projectStatus}</td>
                        <td>{projectObj.projectStartDate}</td>
                        <td>
                          {projectObj.projectEndDate
                            ? projectObj.projectEndDate
                            : "--"}
                        </td>

                        <td>{projectObj.projectFitnessIndicator}</td>
                        <td>{projectObj.gdoHead}</td>
                        <td>{projectObj.projectManager}</td>

                        {userObj.role === "adminUser" && (
                          <td>
                            <button
                              className="btn btn-outline-warning edit-btn btn-sm text-dark"
                              onClick={() => navigateToEditProject(index)}
                            >
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
                        )}
                        {userObj.role === "adminUser" && (
                          <td>
                            <button
                              className="btn btn-outline-danger edit-btn btn-sm text-dark"
                              onClick={() => deleteProject(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PorfolioDashboard;
