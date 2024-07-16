

const TransactionHistory = () => {
    return (
        <div>
            <div className="flex mx-auto justify-center items-center">
                    <div className="pr-[5vw]">
                        <h2 className="w-[10vw]">Date</h2>
                    </div>
                    <div className="border-l-2 pl-[5vw] mb-10">
                        <h3 className="text-xl lg:text-3xl font-serif mt-2 mb-5">Transection type</h3>
                        <p className="mx-auto w-[80vh]">To: </p>
                        <p className="font-semibold font-mono mt-2 md:mt-2 mb-5">Amount:</p>
                    </div>
            </div>
        </div>
    );
};

export default TransactionHistory;