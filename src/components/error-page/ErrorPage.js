import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  let error = useRouteError();
  return (
    <div>
      {/* error message */}
      <div className="text-center text-danger fw-bold">{error.statusText}</div>
      <div className="text-danger">{error.data}</div>
    </div>
  );
}

export default ErrorPage;
