import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AllResourceRequests.css";
import Table from "react-bootstrap/Table";

function ResourceRequests() {
  let { userObj } = useSelector((state) => state.login);
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [requests, setRequests] = useState([]);
  let [getData, setGetData] = useState(false);

  //getResourceRequests
  const getResourceRequests = async () => {
    //get token
    let token = sessionStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
    try {
      let response;
      if (userObj.role === "adminUser") {
        response = await axios.get(
          `http://localhost:4000/Pulse/admin/${userObj.email}/resourceRequest`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      // gdo head
      else if (userObj.role === "gdoHead") {
        response = await axios.get(
          `http://localhost:4000/pulse/gdoHead/${userObj.email}/resourceRequest`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setGetData(true);
      if (response.data.payload) {
        setRequests(response.data.payload);
        setError("");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  // use Effect
  useEffect(() => {
    getResourceRequests();
  }, []);
  return (
    <div className="mt-4">
      <div className="container row ">
        <p className="text-center requests-heading ">Resource Requests</p>
        <div>{error && <p className="text-danger text-center">{error}</p>}</div>
        {!requests.length && getData && (
          <p className="text-danger text-center fw-bold">
            No resource Requestes Raised
          </p>
        )}
        {!requests.length && getData === false && (
          <div className="spinner-border text-success mx-auto" role="status">
            <span className="sr-only"></span>
          </div>
        )}
        {requests.length !== 0 && (
          <div className="row">
            <div className="col-8 col-sm- col-md-10 mx-auto">
              <Table responsive striped bordered hover className="text-center">
                <thead className="resources-thead">
                  <tr>
                    <th>Id</th>
                    <th>Project Id</th>
                    <th>Resource Description</th>
                    <th>Raised By</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length &&
                    requests.map((requestObj, index) => {
                      return (
                        <tr key={index}>
                          <td>{requestObj.id}</td>
                          <td>{requestObj.projectId}</td>
                          <td>{requestObj.resourceDesc}</td>
                          <td>{requestObj.requestRaisedBy}</td>
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

export default ResourceRequests;
