import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";

function Profile() {
  let { userObj } = useSelector((state) => state.login);
  return (
    <div className="container card-container">
      <div className="row  ">
        <div className="col-md-6 mx-auto">
          <p className="heading"></p>
          <div className="card ">
            <div className="row  no-gutters">
              <div className="col-md-4">
                {/* icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  fill="currentColor"
                  class="bi bi-person-lines-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
              </div>
              {/* user details */}
              <div className="col-md-8">
                <div className="card-body">
                  <h3>User Details</h3>
                  <p className="card-text">
                    <b>Name :</b>
                    {userObj.employeeName}
                  </p>
                  <p className="card-text">
                    <b>Email :</b>
                    {userObj.email}
                  </p>
                  <p className="card-text">
                    <b>Role :</b>
                    {userObj.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto h-100 bg-success">
        <div className="col-md-6 my-auto">
          
        </div>
  </div>*/}
    </div>
  );
}

export default Profile;
