import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {

    const {logOut} = useContext(AuthContext)

    const userLinks = <>
        <Link to="/"><li>Home</li></Link>
        <Link to="/history"><li>Transactions History</li></Link>
        <button onClick={()=>logOut()}>Sign Out</button>
    </>

    return (
        <div className="flex justify-center w-full bg-teal-400 mb-[3vw]">
            <div className="flex justify-around md:justify-between py-[3vh] container text-black">
                <h1 className="text-xl font-semibold">Cash N Pay</h1>
                <div className="dropdown dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className="m-1"><GiHamburgerMenu /></div>
                    <ul tabIndex={0} className="dropdown-content menu z-[1] w-fit p-[2vw] space-y-2 shadow text-center">
                        {
                            userLinks
                        }
                    </ul>
                </div>
                <div className="hidden md:block">
                    <ul className="flex gap-[3vh]">
                        {
                            userLinks
                        }
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;