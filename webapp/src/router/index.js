import { createBrowserRouter } from "react-router-dom";
import Home from 'pages/Home'
import Create from 'pages/Create'

const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home
  },
  {
    path: "/create",
    Component: Create
  },
]);

export default routes