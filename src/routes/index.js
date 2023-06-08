import Project from "../pages/Project";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/project",
    element: <Project></Project>,
  },
  {
    path: "/",
    element: <Navigate to="/project" />,
  },
];
