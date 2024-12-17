import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import { useUserStore } from '@/app/store'
import { userApis } from '@/app/services/accounts'
import { IChangePassword, IUpdateProfile, IUserData } from '@/types'
import { IPosts } from '@/types/post'

export const useGetUserById = (
    userId: number | undefined,
    options?: Omit<UseQueryOptions<IUserData>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        enabled: userId !== undefined,
        queryKey: ['getUserById', userId],
        queryFn: () => userApis.getUserById(userId!)
    })
}

export const useUpdateProfile = () => {
    const setUser = useUserStore((state) => state.setUser)
    const setProfile = useUserStore((state) => state.setProfile)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: IUpdateProfile) => userApis.updateProfile(data),
        onSuccess: (data) => {
            setUser(data.user)
            setProfile(data.profile)
            toast.success('Cập nhật thông tin cá nhân thành công')
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        }
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: IChangePassword) => userApis.changePassword(data),
        onSuccess: () => {
            toast.success('Bạn đã thay đổi mật khẩu thành công')
        }
    })
}

export const useAdminPost = (options?: Omit<UseQueryOptions<IPosts[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['admin-post'],
        queryFn: () => userApis.getAdminPost()
    })
}
