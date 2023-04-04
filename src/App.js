import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Componenets
import RootLayout from "./components/rootlayout/RootLayout";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
//import Error Page
import ErrorPage from "./components/errorpage/ErrorPage";

//import root layouts
import SuperAdminRootLayout from "./components/superadminrootlayout/SuperAdminRootLayout";
import AdminRootLayout from "./components/adminrootlayout/AdminRootLayout";
import ProjectManagerRootLayout from "./components/projectmanagerrootlayout/ProjectManagerRootLayout";
import GdoHeadRootLayout from "./components/gdoheadrootlayout/GdoHeadRootLayout";

import AllUsers from "./components/allusers/AllUsers";
import AssignRole from "./components/assignrole/AssignRole";
import PortfolioDashboard from "./components/portfoliodashboard/PorfolioDashboard";
import CreateProject from "./components/createproject/CreateProject";
import DetailedView from "./components/detailedview/DetailedView";

import AddTeam from "./components/addteam/AddTeam";
import RaiseResourceRequest from "./components/raiseresourcerequest/RaiseResourceRequest";
import RaiseProjectConcern from "./components/raiseprojectconcern/RaiseProjectConcern";
import AddProjectUpdate from "./components/addprojectupdate/AddProjectUpdate";
import AllResourceRequests from "./components/allresourcerequests/AllResourceRequests";
import AllProjectConcerns from "./components/allprojectconcerns/AllProjectConcerns";
import ForgotPassword from "./components/forgortpassword/ForgotPassword";
import Profile from "./components/profile/Profile";
import EditProject from "./components/editproject/EditProject";
// import AllUsers from "./components/allusers/AllUsers";
// import AssignRole from "./components/assignrole/AssignRole";

function App() {
  //create broweser router Object
  const broweserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },

        {
          path: "login",
          element: <Login />,
        },
        {
          path: "",
          element: <Login />,
        },
        {
          path: "/user-profile",
          element: <Profile />,
        },
        {
          path: "super-admin/:email",
          element: <SuperAdminRootLayout />,
          children: [
            { path: "get-users", element: <AllUsers /> },
            {
              path: "",
              element: <AllUsers />,
            },
            {
              path: "assign-role",
              element: <AssignRole />,
            },
          ],
        },
        {
          path: "admin-user/:email",
          element: <AdminRootLayout />,
          children: [
            { path: "", element: <PortfolioDashboard /> },
            { path: "create-project", element: <CreateProject /> },
            { path: "resource-requests", element: <AllResourceRequests /> },
            { path: "project-concerns", element: <AllProjectConcerns /> },
            {
              path: "portfolio-dashboard",
              element: <PortfolioDashboard />,
              children: [],
            },
            {
              path: "project-detailed-view/:projectId",
              element: <DetailedView />,
            },
            {
              path: "edit-project",
              element: <EditProject />,
            },
          ],
        },

        {
          path: "gdo-head/:email",
          element: <GdoHeadRootLayout />,
          children: [
            { path: "", element: <PortfolioDashboard /> },
            { path: "add-team", element: <AddTeam /> },
            { path: "resource-requests", element: <AllResourceRequests /> },
            { path: "project-concerns", element: <AllProjectConcerns /> },
            {
              path: "portfolio-dashboard",
              element: <PortfolioDashboard />,
              children: [],
            },
            {
              path: "project-detailed-view/:projectId",
              element: <DetailedView />,
            },
          ],
        },
        {
          path: "project-manager/:email",
          element: <ProjectManagerRootLayout />,
          children: [
            { path: "", element: <PortfolioDashboard /> },
            {
              path: "raise-resource-request",
              element: <RaiseResourceRequest />,
            },
            {
              path: "raise-project-concern",
              element: <RaiseProjectConcern />,
            },

            { path: "add-project-update", element: <AddProjectUpdate /> },
            {
              path: "portfolio-dashboard",
              element: <PortfolioDashboard />,
              children: [],
            },
            {
              path: "project-detailed-view/:projectId",
              element: <DetailedView />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div className="App">
      {/* provide browser Router Object to App */}
      <RouterProvider router={broweserRouterObj} />
    </div>
  );
}

export default App;
