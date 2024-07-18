// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTransactionManagement from "../../Hooks/useTransactionManagement";

const TransactionManagement = () => {

    const [, transactions ] = useTransactionManagement()
    const pending = transactions?.filter(transaction=>transaction.request === 'pending')
    // const axiosSecure = useAxiosSecure()
    console.log(pending);
    // const handler = ()=>{
    //     axiosSecure.patch()
    // }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pending?.map((
                                data, index) => <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.from}</td>
                                <td className="capitalize">{data.type}</td>
                                {
                                    data.request === 'pending' ?
                                        <td><button className="btn">Approve</button></td>
                                        :
                                        <td className="capitalize">{data.request}</td>
                                }
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionManagement;