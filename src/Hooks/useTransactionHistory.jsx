import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUserData from './useUserData';

const useTransactionHistory = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const [, userData] = useUserData(user?.email)
    const id = userData?._id

    const { refetch, data: history, isLoading } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/history/${id}`)
            return res.data
        }
    })
    return [refetch, history, isLoading]
};

export default useTransactionHistory;