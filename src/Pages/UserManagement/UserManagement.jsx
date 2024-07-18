import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUsersList from "../../Hooks/useUsersList";

const UserManagement = () => {

    const [refetch, usersData] = useUsersList()
    const axiosSecure = useAxiosSecure()
    console.log(usersData);

    const handleRole = (status, id) => {
        Swal.fire({
            title: 'Confirm Access',
            text: `Are you sure you would like to provide ${status} access?`,
            icon: 'info',
            confirmButtonText: 'Yes, I am'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/access/${id}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: 'New Admin',
                                    text: `You have granted ${status} access`,
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                })
                            }

                        }
                        )
                    refetch()
                }
            }
            )
    }

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
                                <th>{index + 1}</th>
                                <td>{userData.name}</td>
                                <td className="capitalize">{userData.accountType}</td>
                                <td className="capitalize">{userData.status}</td>
                                {
                                    userData.status === 'pending' ?
                                        <td><button onClick={() => handleRole(userData.accountType, userData._id)} className="btn">Approve</button></td>
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