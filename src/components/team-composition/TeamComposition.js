import React from "react";
import Table from "react-bootstrap/Table";

function TeamComposition({ team }) {
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
                    <td>{teamObj.startDate}</td>
                    <td>{teamObj.allocationType}</td>
                    <td>{teamObj.exposedToClient}</td>
                    <td>{teamObj.status}</td>
                    <td>{teamObj.endDate}</td>
                    <td>{teamObj.billingStatus}</td>
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
