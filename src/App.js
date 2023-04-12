import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Componenets
import RootLayout from "./components/rootlayout/RootLayout";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
//import Error Page
import ErrorPage from "./components/error-page/ErrorPage";

//import dashbord layouts
import SuperAdminRootLayout from "./components/superadmin-rootlayout/SuperAdminRootLayout";
import AdminRootLayout from "./components/admin-rootlayout/AdminRootLayout";
import ProjectManagerRootLayout from "./components/projectmanager-rootlayout/ProjectManagerRootLayout";
import GdoHeadRootLayout from "./components/gdo-head-rootlayout/GdoHeadRootLayout";

import AllUsers from "./components/all-users/AllUsers";
import AssignRole from "./components/assign-role/AssignRole";
import PortfolioDashboard from "./components/portfolio-dashboard/PortfolioDashboard";
import CreateProject from "./components/create-project/CreateProject";
import DetailedView from "./components/detailed-view/DetailedView";

import AddTeam from "./components/add-team/AddTeam";
import RaiseResourceRequest from "./components/raise-resource-request/RaiseResourceRequest";
import RaiseProjectConcern from "./components/raise-project-concern/RaiseProjectConcern";
import AddProjectUpdate from "./components/add-project-update/AddProjectUpdate";
import AllResourceRequests from "./components/all-resource-requests/AllResourceRequests";
import AllProjectConcerns from "./components/all-project-concerns/AllProjectConcerns";
import ForgotPassword from "./components/forgort-password/ForgotPassword";
import Profile from "./components/profile/Profile";
import EditProject from "./components/edit-project/EditProject";
import EditTeamMember from "./components/edit-team-memeber/EditTeamMember";
import EditProjectConcern from "./components/edit-project-concern/EditProjectConcern";

function App() {
  //create broweser router Object
  const broweserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        // {
        //   path: "/home",
        //   element: <Home />,
        // },
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
        // super admin
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
        // admin user
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
        // gdo head
        {
          path: "gdo-head/:email",
          element: <GdoHeadRootLayout />,
          children: [
            { path: "", element: <PortfolioDashboard /> },
            { path: "add-team", element: <AddTeam /> },
            { path: "resource-requests", element: <AllResourceRequests /> },
            { path: "project-concerns", element: <AllProjectConcerns /> },
            {
              path: "raise-resource-request",
              element: <RaiseResourceRequest />,
            },
            {
              path: "portfolio-dashboard",
              element: <PortfolioDashboard />,
              children: [],
            },
            {
              path: "project-detailed-view/:projectId",
              element: <DetailedView />,
            },
            { path: "editTeamMember/:email", element: <EditTeamMember /> },
          ],
        },
        // project manager
        {
          path: "project-manager/:email",
          element: <ProjectManagerRootLayout />,
          children: [
            { path: "", element: <PortfolioDashboard /> },

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
            {
              path: "projectId/:projectId/editConcern",
              element: <EditProjectConcern />,
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
