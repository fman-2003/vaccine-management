import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./query";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DashboardRootLayout from "./components/DasboardRoot.jsx";
import Children from "./components/Children.jsx";
import ChildProfile from "./components/ChildProfile.jsx";
import ChildrenRootLayout from "./components/ChildrenRoot.jsx";
import ParentsRootLayout from "./components/ParentsRoot.jsx";
import Parents from "./components/Parents.jsx";
import VaccinesRootLayout from "./components/VaccinesRoot.jsx";
import Vaccines from "./components/Vaccines.jsx";
import SchedulesRootLayout from "./components/SchedulesRoot.jsx";
import Schedules from "./components/Schedules.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardRootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/children",
    element: <ChildrenRootLayout />,
    children: [
      {
        index: true,
        element: <Children />,
      },
      {
        path: "child",
        element: <ChildProfile />,
      },
    ],
  },
  {
    path: "/parents",
    element: <ParentsRootLayout />,
    children: [
      {
        index: true,
        element: <Parents />,
      },
    ],
  },
  {
    path: "/vaccines",
    element: <VaccinesRootLayout />,
    children: [
      {
        index: true,
        element: <Vaccines />,
      },
    ],
  },
  {
    path: "/schedules",
    element: <SchedulesRootLayout />,
    children: [
      {
        index: true,
        element: <Schedules />,
      },
    ],
  },
]);
function App() {
  return (
    // <div style={{width: "100%"}}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    // </div>
  );
}

export default App;
