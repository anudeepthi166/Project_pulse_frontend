import React from "react";
import "./ProjectDetails.css";

function ProjectDetails({ projectDetails }) {
  return (
    <div className="mt-5 mb-3">
      <div className="row container  mt-3">
        <p className="text-center details-heading mt-3 "> Project Details</p>
        {/* 1st column */}
        <div className="col-sm-6 col-md-4 ">
          <p>
            <b>Project Name:</b>
            {projectDetails.projectName}
          </p>
          <p>
            <b>Client:</b>
            {projectDetails.client?.clientEmail}
          </p>
          <p>
            <b>Client Account Manager:</b>
            {projectDetails.client?.clientAccountManager}
          </p>
        </div>
        {/* second column */}
        <div className="col-sm-6 col-md-4">
          <p>
            <b>Start Date:</b>
            {projectDetails.projectStartDate}
          </p>
          <p>
            <b>End Date:</b>
            {projectDetails.projectEndDate}
          </p>
          <p>
            <b>Fitness Indicator:</b>
            {projectDetails.projectFitnessIndicator}
          </p>
          <p>
            <b>Status:</b>
            {projectDetails.projectStatus}
          </p>
        </div>
        {/* third column */}
        <div className="col-sm-6 col-md-4">
          <p>
            <b>Domain:</b>
            {projectDetails.projectDomain}
          </p>
          <p>
            <b>Project Type:</b>
            {projectDetails.projectType}
          </p>
          <p>
            <b>Team Size:</b>
            {projectDetails.count}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
