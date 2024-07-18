import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import useUserData from "../Hooks/useUserData";


const AdminRoute = ({children}) => {
    const {loading} = useContext(AuthContext)
    const location = useLocation()
    const adminRoute = location.pathname.includes('users')
    const [,userData] = useUserData()

    if (adminRoute) {
        if (userData?.status !== 'approved' && userData?.accountType === 'admin') {
            return children
        }
        else{
            return <Navigate to='/register' state={{from: location}} replace></Navigate>
        }
    }
    if (loading) {
        return <div className="w-16 h-16 absolute top-2/4 right-1/2 border-4 border-dashed rounded-full border-emerald-500 m-auto animate-spin dark:border-violet-600"></div>
    }
    
};

export default AdminRoute;