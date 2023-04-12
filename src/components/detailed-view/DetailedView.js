import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import componenets
import ProjectDetails from "../project-details/ProjectDetails";
import ProjectUpdates from "../project-updates/ProjectUpdates";
import TeamComposition from "../team-composition/TeamComposition";
import ProjectConcerns from "../project-concerns/ProjectConcerns";

import "./DetailedView.css";
import Accordion from "react-bootstrap/Accordion";

function DetailedView() {
  // state
  let { state } = useLocation();
  let [error, setError] = useState("");
  let [getData, setGetData] = useState(false);
  let [projectDetails, setProjectDetails] = useState({});
  let [projectUpdates, setProjectUpdates] = useState([]);
  let [team, setTeam] = useState([]);
  let [projectConcerns, setProjectConcerns] = useState([]);
  // let [concernCount, setConcernCount] = useState(0);
  let concernCount = 0;

  //get Project detailed View
  const getProjectDetailedView = async () => {
    //get the token
    let token = sessionStorage.getItem("token");
    try {
      let projectResponse;
      // Admin User
      if (state.role === "adminUser") {
        projectResponse = await axios.get(
          `http://localhost:4000/pulse/admin/${state.email}/projectId/${state.projectId}/detailedView`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // gdo Head
      else if (state.role === "gdoHead") {
        projectResponse = await axios.get(
          `http://localhost:4000/pulse/gdoHead/${state.email}/projectId/${state.projectId}/detailedView`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // project manager
      else if (state.role == "projectManager") {
        projectResponse = await axios.get(
          `http://localhost:4000/pulse/projectManager/${state.email}/projectId/${state.projectId}/detailedView`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setGetData(true);
      // setting details,updated,concerns,teamcomposition of project
      if (projectResponse.data.payload) {
        setProjectDetails(projectResponse.data.payload);
        setProjectUpdates(projectResponse.data.payload.projectUpdates);
        setTeam(projectResponse.data.payload.teamMembers);
        setProjectConcerns(projectResponse.data.payload.concerns);

        setError("");
      } else {
        throw new Error(projectResponse.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  //useEffect
  useEffect(() => {
    getProjectDetailedView();
  }, []);

  return (
    <div>
      {/* Error */}
      <div className="container mx-auto text-center">
        {error && <p className="text-danger text-center fw-bold">{error}</p>}{" "}
        {/* !Object.keys(projectDetails).length &&  */}
        {!getData && (
          <div className="spinner-border text-success  ms-5" role="status">
            <span className="sr-only"></span>
          </div>
        )}
      </div>
      <p className="text-center detailed-view-heading mt-3 ">
        {" "}
        Detailed View Of Project Id :{projectDetails.projectId}
      </p>
      {/* cards */}
      <div className="row ps-3 container mx-auto  justify-content-around  mt-4 ">
        {/* Project Status */}
        <div className="card col-sm-6 col-md-5 col-lg-3 ">
          <div className="card-title pt-3 ps-2">Concern Indicator</div>
          <div className="card-body">
            {projectConcerns.map((concernObj) => {
              if (concernObj.concernStatus === "raised") {
                concernCount += 1;
              }
            })}
            <h2 className="float-end ">{concernCount}</h2>
          </div>
        </div>
        {/* project Fitness Indicator */}

        <div className="card col-sm-6 col-md-5 col-lg-4 ">
          <div className="card-title pt-3 ps-2 ">Project Fitness Indicator</div>
          <div className="card-body">
            {projectDetails.projectFitnessIndicator}
            {/* Amber */}
            {projectDetails.projectFitnessIndicator === "amber" && (
              <p className="float-end w-25 amber">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </p>
            )}
            {/* red */}
            {projectDetails.projectFitnessIndicator === "red" && (
              <p className="float-end w-25 text-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="red"
                  className="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </p>
            )}
            {/* green */}
            {projectDetails.projectFitnessIndicator === "green" && (
              <p className="float-end w-25 text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </p>
            )}
          </div>
        </div>
        {/* Team Count */}
        <div className="card col-sm-6 col-md-5 col-lg-3">
          <div className="card-title pt-3 ps-2">Billed team members Count</div>
          <div className="card-body ">
            <h2 className="float-end ">{projectDetails.count}</h2>
          </div>
        </div>
      </div>
      <div className="detailed-view mt-2 ">
        <div className="detailed-view-inner">
          <ProjectDetails projectDetails={projectDetails} />
        </div>
      </div>
      {/* project Updates */}
      <div className="mt-4 accordion">
        <Accordion>
          {/* To keep default OPened */}
          {/* defaultActiveKey={["0"]} alwaysOpen */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className="accordion-heading">Project Updates</p>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {/* project updates componenet */}
              <ProjectUpdates projectUpdates={projectUpdates} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {/* project Concerns */}
      <div className="mt-4">
        <Accordion>
          {/* defaultActiveKey={["0"]} alwaysOpen */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className="accordion-heading">Project Concerns</p>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {/* project components componenet */}
              <ProjectConcerns projectConcerns={projectConcerns} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {/* Team details */}
      <div className="mt-4 mb-4">
        <Accordion>
          {/* defaultActiveKey={["0"]} alwaysOpen */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <p className="accordion-heading">Team Details</p>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              {/* Team Compositioncomponenet */}
              <TeamComposition team={team} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default DetailedView;
