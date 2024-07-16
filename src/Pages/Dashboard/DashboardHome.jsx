import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


const DashboardHome = () => {

    const {user} = useContext(AuthContext)
    const boxStyle = "w-full text-xl px-[30vw] py-[3vw] hover:bg-emerald-500 bg-blue-200 border-blue-600 hover:text-red-400"

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="w-[30vw] h-[30vw] rounded-full bg-emerald-500 flex justify-center items-center border-teal-900 border-[3vw] z-10">
                    <h1 className="text-center w-fit text-[2vw] hover:scale-150">520000</h1>
                </div>
                <div>
                    <div className="-ml-[20vw] ">
                        <div className="px-[2vw] text-center">
                            <Link to={`/sendMoney/${user?.email}`}>
                                <div className={`${boxStyle} rounded-t-full hover:bg-teal-300 border-b`}>
                                    <h2>Send Money</h2>
                                </div>
                            </Link>
                            <div className={`${boxStyle} border-b`}>
                                <h2>Cash Out</h2>
                            </div>
                            <div className={`${boxStyle} rounded-b-full`} >
                                <h2>Cash In</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;