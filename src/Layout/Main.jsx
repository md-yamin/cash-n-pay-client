import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shaired/Navbar";


const Main = () => {
    const location = useLocation()
    const noNavbar = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            {noNavbar ||<Navbar></Navbar> }
            <Outlet></Outlet>
        </div>
    );
};

export default Main;