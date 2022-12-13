import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Appoinment from "../Pages/Appoinment/Appoinment/Appoinment";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import ManageDoctor from "../Pages/Dashboard/ManageDoctor/ManageDoctor";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Users from "../Pages/Dashboard/Users/Users";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import DisplayError from "../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/appoinment',
                element: <PrivateRoute><Appoinment></Appoinment></PrivateRoute> 
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path:'/dashboard',
                element: <MainDashboard></MainDashboard>
            },
            {
                path:'/dashboard/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path:'/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path:'/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
            },
            {
                path:'dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=> fetch(`https://doctors-portal-server-orpin-ten.vercel.app/bookings/${params.id}`)
            }
        ]
    }
]);

export default router;