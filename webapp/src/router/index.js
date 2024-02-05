import { createBrowserRouter } from "react-router-dom";
import Home from 'pages/Home'
import Create from 'pages/Create'

const routes = createBrowserRouter([
  {
    path: "/",
    element: Home()
  },
  {
    path: "/create",
    element: Create()
  },
]);

export default routes