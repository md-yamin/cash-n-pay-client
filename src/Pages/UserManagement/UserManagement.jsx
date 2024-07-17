import useUsersList from "../../Hooks/useUsersList";

const UserManagement = () => {

    const [refetch, usersData] = useUsersList()

    refetch()

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersData.map((userData, index) => <tr key={userData._id}>
                                <th>{index+1}</th>
                                <td>{userData.name}</td>
                                <td className="capitalize">{userData.accountType}</td>
                                <td className="capitalize">{userData.status}</td>
                                {
                                    userData.status === 'pending'?
                                    <td><button className="btn">Approve</button></td>
                                    :
                                    <></>
                                }
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserManagement;