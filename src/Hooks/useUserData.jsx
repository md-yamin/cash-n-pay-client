import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserData = (email) => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()


    const { refetch, data: userData } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${email}`)
            return res.data
        }
    })
    return [refetch, userData]
};

export default useUserData;