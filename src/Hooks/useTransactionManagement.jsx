import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useUserData from './useUserData';

const useTransactionManagement = () => {
    const axiosSecure = useAxiosSecure()
    const [, userData] = useUserData()
    const id = userData?.number


    const { refetch, data: transactions, isLoading } = useQuery({
        queryKey: ['transactions', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/transactionsManagement/${id}`)
            return res.data
        }
    })
    return [refetch, transactions, isLoading]
};

export default useTransactionManagement;