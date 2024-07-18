import useTransactionHistory from "../../Hooks/useTransactionHistory";
import useUserData from "../../Hooks/useUserData";

const TransactionHistory = () => {

    const [, history] = useTransactionHistory()
    const [, userData] = useUserData()
    console.log(userData);

    const transactionType = (type) => {
        if (type === "cashOut") {
            return "Cash Out"
        }
        else if (type === "cashIn") {
            return "Cash In"
        }
        else if (type === "sendMoney") {
            return "Sent Money"
        }
        return "Recieved Money"

    }

    return (
        <div>
            {
                history?.map(h => <div key={h._id} className="flex mx-auto justify-center items-center">
                    <div>
                        <h2 className="w-[10vw]">{h.date}</h2>
                        <h2 className="w-[10vw]">{h.time}</h2>
                    </div>
                    <div className="border-l-2 pl-[5vw] mb-10">
                        <h3 className="text-xl lg:text-3xl font-serif mt-2 mb-5">{transactionType(h.type)}</h3>
                        {

                            h.to === userData?.number ?
                                <p className="w-[80vh]">From: {h.from}</p>
                                :
                                <></>
                            // (
                            //     (h.to && h.to !== userData?.number) ?
                            //         (<p className="w-[80vh]">To: {h.to}</p>)
                            //         :
                            //         (<></>)
                            // )
                            //     (
                            //         (h.to && h.to !== userData?.number) ?
                            //             (<p className="w-[80vh]">To: {h.to}</p>)
                            //             :
                            //             (<></>)
                            //     )


                        }
                        <p className="font-semibold font-mono mt-2 md:mt-2 mb-5">Amount:{h.amount}</p>
                    </div>
                </div>)
            }

        </div>
    );
};

export default TransactionHistory;