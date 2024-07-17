import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    
    if (loading) {
        return <div className="w-16 h-16 absolute top-2/4 right-1/2 border-4 border-dashed rounded-full border-emerald-500 m-auto animate-spin dark:border-violet-600"></div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/register' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;