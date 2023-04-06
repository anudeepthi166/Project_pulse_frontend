import React from "react";
import "./ProjectUpdates.css";
import Table from "react-bootstrap/Table";

function ProjectUpdates({ projectUpdates }) {
  console.log("ProjectU", projectUpdates.length);
  return (
    <div className="">
      <div className="row mt-4 ">
        {!projectUpdates.length && (
          <p className="text-danger fw-bold">No Updates For This Project</p>
        )}
        {projectUpdates.length !== 0 && (
          <Table responsive striped bordered hover className="text-center">
            <thead className="updates-thead text-light">
              <tr>
                <th>update Id</th>
                <th>Updated On</th>
                <th>Status Update</th>
                <th> Quality Status</th>
                <th>Resourcing Status</th>
                <th>Schedule Status</th>
                <th>Waiting For Clients Input</th>
              </tr>
            </thead>
            <tbody>
              {projectUpdates.map((projectUpdateObj, index) => {
                return (
                  <tr key={index}>
                    <td>{projectUpdateObj.updateId}</td>
                    <td>{projectUpdateObj.updatedOn}</td>
                    <td>{projectUpdateObj.projectStatusUpdate}</td>
                    <td>{projectUpdateObj.qualityStatus}</td>
                    <td>{projectUpdateObj.resourcingStatus}</td>
                    <td>{projectUpdateObj.scheduleStatus}</td>
                    <td>{projectUpdateObj.waitingForClientsInputs}</td>
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

export default ProjectUpdates;
