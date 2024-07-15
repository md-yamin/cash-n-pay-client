import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

    const userLinks = <>
        <li>Home</li>
        <li>Balance Inquiry</li>
        <li>Transactions History</li>
    </>

    return (
        <div className="flex justify-center fixed z-10 w-full bg-black bg-opacity-10">
            <div className="flex justify-around md:justify-between py-[3vh] container text-slate-100">
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