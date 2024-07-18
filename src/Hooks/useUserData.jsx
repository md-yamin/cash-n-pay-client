import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const { refetch, data: userData, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    return [refetch, userData, isLoading]
};

export default useUserData;