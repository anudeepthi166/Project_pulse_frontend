import React from "react";
import "./ProjectDetails.css";

function ProjectDetails({ projectDetails }) {
  console.log("Details", projectDetails);
  return (
    <div className="mt-5 mb-3">
      <div className="row container  mt-3">
        <p className="text-center details-heading mt-3 "> Project Details</p>
        <div className="col-sm-6 col-md-4 ">
          <p>
            <b>Project Name:</b>
            {projectDetails.projectName}
          </p>
          <p>
            <b>Start Date:</b>
            {projectDetails.projectStartDate}
          </p>
          <p>
            <b>End Date:</b>
            {projectDetails.projectEndDate}
          </p>
        </div>
        <div className="col-sm-6 col-md-4">
          <p>
            <b>Status:</b>
            {projectDetails.projectStatus}
          </p>
          <p>
            <b>Fitness Indicator:</b>
            {projectDetails.projectFitnessIndicator}
          </p>
          <p>
            <b>Team Size:</b>
            {projectDetails.count}
          </p>
        </div>
        <div className="col-sm-6 col-md-4">
          <p>
            <b>Project Type:</b>
            {projectDetails.projectType}
          </p>
          <p>
            <b>Domain:</b>
            {projectDetails.projectDomain}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
