import React from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeamComposition({ team }) {
  // state from redux store
  let { userObj } = useSelector((state) => state.login);
  let navigate = useNavigate();

  //navigate to edit team member
  const navigateToEditTeamMember = (teamMember) => {
    navigate(`/gdo-head/${userObj.email}/editTeamMember/${teamMember.email}`, {
      state: teamMember,
    });
  };
  return (
    <div>
      {" "}
      <div className="row mt-4">
        {team.length === 0 && (
          <p className="text-danger fw-bold">
            No Team Members were Added to This Project
          </p>
        )}
        {team.length !== 0 && (
          <Table responsive striped bordered hover className="text-center">
            <thead className="thead-success">
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Project id</th>
                <th>Role</th>
                <th>Start date</th>
                <th>Allocation Type</th>
                <th>Exposed To client</th>
                <th>Status</th>
                <th>End date</th>
                <th>Billing Status</th>
                {userObj.role === "gdoHead" && <th>Edit</th>}
              </tr>
            </thead>
            <tbody>
              {team.map((teamObj, index) => {
                return (
                  <tr key={index}>
                    <td>{teamObj.id}</td>
                    <td>{teamObj.email}</td>
                    <td>{teamObj.projectId}</td>
                    <td>{teamObj.role}</td>
                    <td>{teamObj.startDate.split("T")[0]}</td>
                    <td>{teamObj.allocationType}</td>
                    <td>{teamObj.exposedToClient ? "Yes" : "No"}</td>
                    <td>{teamObj.status}</td>
                    <td>
                      {teamObj.endDate ? teamObj.endDate.split("T")[0] : "--"}
                    </td>
                    <td>{teamObj.billingStatus}</td>
                    {userObj.role === "gdoHead" && (
                      <td>
                        <button
                          className="btn btn-outline-warning edit-btn btn-sm text-dark"
                          onClick={() => navigateToEditTeamMember(team[index])}
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

export default TeamComposition;
