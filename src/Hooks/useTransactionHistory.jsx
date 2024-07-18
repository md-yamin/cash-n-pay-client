import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUserData from './useUserData';

const useTransactionHistory = () => {
    const axiosSecure = useAxiosSecure()
    const [, userData] = useUserData()
    console.log(userData);
    const id = userData?.number
    console.log(id);


    const { refetch, data: history, isLoading } = useQuery({
        queryKey: ['history', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/history/${id}`)
            return res.data
        }
    })
    return [refetch, history, isLoading]
};

export default useTransactionHistory;