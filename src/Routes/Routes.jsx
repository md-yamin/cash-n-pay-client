import { createBrowserRouter } from "react-router-dom";
import Register from "../Shaired/Register";
import Main from "../Layout/Main";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Register></Register>,
        }
      ]
    },
  ]);