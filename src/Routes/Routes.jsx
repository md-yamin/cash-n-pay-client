import { createBrowserRouter } from "react-router-dom";
import Register from "../Shaired/Register";
import Main from "../Layout/Main";
import Error404 from "../Shaired/Error404";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import TransactionHistory from "../Pages/TransactionHistory/TransactionHistory";
import Login from "../Shaired/Login";
import PrivateRoute from "./PrivateRoute";
import SendMoney from "../Pages/SendMoney/SendMoney";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error404></Error404>,
      children: [
        {
            path: "/",
            element:<PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>,
        },
        {
            path: "/register",
            element: <Register></Register>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/history",
            element: <PrivateRoute><TransactionHistory></TransactionHistory></PrivateRoute>,
        },
        {
            path: "/sendMoney/:id",
            element: <PrivateRoute><SendMoney></SendMoney></PrivateRoute>,
        },
      ]
    },
  ]);