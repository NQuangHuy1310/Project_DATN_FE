import { userApis } from '@/app/services/accounts'
import { IUserData } from '@/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetUserById = (userId: number, options?: Omit<UseQueryOptions<IUserData>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        enabled: userId !== undefined,
        queryKey: ['getUserById', userId],
        queryFn: () => userApis.getUserById(userId)
    })
}
