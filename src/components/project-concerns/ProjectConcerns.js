import React from "react";
import "./ProjectConcerns.css";
import Table from "react-bootstrap/Table";

function ProjectConcerns({ projectConcerns }) {
  console.log(projectConcerns);
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
                <th>Indicator</th>
                <th> Raised By</th>
                <th>Raised From Client</th>
                <th>Raised On</th>
                <th>Status</th>
                <th>Severity</th>
                <th>Mitigated Date</th>
              </tr>
            </thead>
            <tbody>
              {projectConcerns.map((projectConcernObj, index) => {
                return (
                  <tr key={index}>
                    <td>{projectConcernObj.concernId}</td>
                    <td>{projectConcernObj.concernDesc}</td>
                    <td>{projectConcernObj.concernIndicator}</td>
                    <td>{projectConcernObj.concernRaisedBy}</td>
                    <td>{projectConcernObj.concernRaisedFromClient}</td>
                    <td>{projectConcernObj.concernRaisedOn}</td>
                    <td>{projectConcernObj.concernStatus}</td>
                    <td>{projectConcernObj.concernSeverity}</td>
                    <td>{projectConcernObj.concernMitigatedDate}</td>
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
