import { userApis } from '@/app/services/accounts'
import { IProfileUser, IUserProfile } from '@/types'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useProfile = (options?: Omit<UseQueryOptions<IUserProfile>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IUserProfile>({
        ...options,
        queryKey: ['profile'],
        queryFn: userApis.getProfile
    })
}
export const useGetProfile = (email: string, options?: Omit<UseQueryOptions<IProfileUser>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IProfileUser>({
        ...options,
        queryKey: ['profile-user', email],
        queryFn: () => userApis.getDetailProfile(email)
    })
}
