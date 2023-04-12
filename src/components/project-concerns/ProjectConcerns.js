import React from "react";
import "./ProjectConcerns.css";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectConcerns({ projectConcerns }) {
  let { userObj } = useSelector((state) => state.login);

  let navigate = useNavigate();
  // navigateToEditConcern
  const navigateToEditConcern = (concernObj) => {
    // add projectId to concernObj

    concernObj.projectId = projectConcerns[0].projectId;
    navigate(
      `/project-manager/${userObj.email}/projectId/${projectConcerns[0].projectId}/editConcern`,
      { state: concernObj }
    );
  };
  return (
    <div>
      <div className="row mt-4">
        {projectConcerns.length === 0 && (
          <p className="text-danger fw-bold">No Concerns For This Project</p>
        )}
        {projectConcerns.length !== 0 && (
          <Table responsive striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Concern Id</th>
                <th>Description</th>
                <th> Raised By</th>
                <th>Raised On</th>
                <th>Severity</th>
                <th>Raised From Client</th>
                <th>Status</th>
                <th>Mitigated On Date</th>
                {userObj.role === "projectManager" && <th>Edit</th>}
              </tr>
            </thead>
            <tbody>
              {projectConcerns.map((projectConcernObj, index) => {
                return (
                  <tr key={index}>
                    <td>{projectConcernObj.concernId}</td>
                    <td>{projectConcernObj.concernDesc}</td>
                    <td>{projectConcernObj.concernRaisedBy}</td>
                    <td>{projectConcernObj.concernRaisedOn.split("T")[0]}</td>
                    <td>{projectConcernObj.concernSeverity}</td>

                    <td>
                      {projectConcernObj.concernRaisedFromClient === 1
                        ? "Yes"
                        : "No"}
                    </td>

                    <td>{projectConcernObj.concernStatus}</td>

                    <td>
                      {projectConcernObj.concernMitigatedDate?.split("T")[0]
                        .length
                        ? projectConcernObj.concernMitigatedDate.split("T")[0]
                        : "--"}
                    </td>
                    {userObj.role === "projectManager" && (
                      <td>
                        <button
                          className="btn btn-outline-warning edit-btn btn-sm text-dark"
                          onClick={() =>
                            navigateToEditConcern(projectConcerns[index])
                          }
                        >
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
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
        )}
      </div>
    </div>
  );
}

export default ProjectConcerns;
