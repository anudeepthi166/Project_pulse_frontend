import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import "./AllProjectConcerns.css";

function AllProjectConcerns() {
  let { userObj } = useSelector((state) => state.login);
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [concerns, setConcerns] = useState([]);
  let [getData, setGetData] = useState(false);

  //getResourceRequests
  const getConcerns = async () => {
    //get token
    let token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
    try {
      let response;
      if (userObj.role === "adminUser") {
        response = await axios.get(
          `http://localhost:4000/Pulse/admin/${userObj.email}/concerns`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // gdo head
      else if (userObj.role === "gdoHead") {
        response = await axios.get(
          `http://localhost:4000/pulse/gdoHead/${userObj.email}/concerns`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setGetData(true);
      if (response.data.payload) {
        setConcerns(response.data.payload);

        setError("");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  // use Effect
  useEffect(() => {
    getConcerns();
  }, []);
  return (
    <div className="mt-4">
      <div className="container row ">
        <p className="text-center concern-heading ">Projects Concerns </p>
        <div className="row mx-auto">
          {" "}
          {!concerns.length && getData === false && (
            <div className="spinner-border text-success mx-auto" role="status">
              <span className="sr-only"></span>
            </div>
          )}
        </div>
        <div>{error && <p className="text-danger text-center">{error}</p>}</div>
        {!concerns.length && getData && (
          <p className="text-danger text-center fw-bold">No Concerns Raised</p>
        )}
        {concerns.length !== 0 && (
          <div className="row">
            <div className="">
              <Table responsive striped bordered hover className="text-center">
                <thead className="concerns-heading">
                  <tr>
                    {" "}
                    <th>Concern Id</th>
                    <th>Project Id</th>
                    <th>Description</th>
                    <th> Raised By</th>
                    <th>Raised From Client</th>
                    <th>Raised On</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Mitigated Date</th>
                  </tr>
                </thead>
                <tbody>
                  {concerns.length &&
                    concerns.map((projectConcernObj, index) => {
                      return (
                        <tr key={index}>
                          <td>{projectConcernObj.concernId}</td>
                          <td>{projectConcernObj.projectId}</td>
                          <td>{projectConcernObj.concernDesc}</td>

                          <td>{projectConcernObj.concernRaisedBy}</td>
                          <td>
                            {projectConcernObj.concernRaisedFromClient
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {projectConcernObj.concernRaisedOn.split("T")[0]}
                          </td>
                          <td>{projectConcernObj.concernStatus}</td>
                          <td>{projectConcernObj.concernSeverity}</td>
                          <td>
                            {projectConcernObj.concernMitigatedDate
                              ? projectConcernObj.concernMitigatedDate.split(
                                  "T"
                                )[0]
                              : "--"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProjectConcerns;
