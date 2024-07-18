import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import useUserData from "../../Hooks/useUserData";


const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const boxStyle = "w-full px-[20vw] py-[2vw] hover:bg-emerald-500 bg-blue-200 border-blue-600 hover:text-red-400"
    const [, userData] = useUserData()

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="w-[13vw] h-[13vw] rounded-full bg-emerald-200 flex justify-center items-center border-teal-900 border-[1vw] z-10">
                    <img src="https://i.ibb.co/Fghj28D/a72f07327d1ff9eb11d16c26194ec717.png" alt="" />
                </div>
                <div>
                    <div className="-ml-[10vw]">
                        <div className="px-[2vw]">
                            <div className={`${boxStyle} rounded-full text-[3vw] hover:bg-teal-300`}>
                                <h2>{userData?.balance}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-3 mt-[5vw] w-2/3 mx-auto gap-y-10 text-center">
                    <Link to={`/sendMoney/${user?.email}`}>
                        <button className="bg-teal-500 py-5 rounded-lg text-xl w-[15vw] hover:bg-teal-300">Send Money</button>
                    </Link>

                    <Link to={`/cashOut/${user?.email}`}>
                        <button className="bg-teal-500 py-5 rounded-lg text-xl w-[15vw] hover:bg-teal-300">Cash Out</button>
                    </Link>

                    <Link to={`/cashIn/${user?.email}`}>
                        <button className="bg-teal-500 py-5 rounded-lg text-xl w-[15vw] hover:bg-teal-300">Cash In</button>
                    </Link>
                    {
                        userData?.status !== 'approved' ?

                            (
                                userData?.accountType === 'agent' ?

                                (< Link className="col-span-3" to={`/transactionManagement`}>
                                    <button className="bg-teal-500 px-10 py-5 rounded-lg text-xl hover:bg-teal-300">Transaction Management</button>
                                </Link>)
                                :
                                (<Link className="col-span-3" to={`/users`}>
                                    <button className="bg-teal-500 px-10 py-5 rounded-lg text-xl hover:bg-teal-300">User Management</button>
                                </Link>)
                            )
                            :
                            (<></>)

                    }

                </div>
            </div>
        </div >
    );
};

export default DashboardHome;