import routes from '@/configs/routes'
import { toast } from 'sonner'
import { userApis } from '@/app/services/accounts'
import { useNavigate } from 'react-router-dom'
import { IRegisterInstructor } from '@/types/user'
import { HistoryLeaning, IVoucherDiscount } from '@/types'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useUserStore } from '@/app/store/userStore'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

export const useRegisterTeacher = () => {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)
    const { user } = useGetUserProfile()
    return useMutation<any, Error, [IRegisterInstructor]>({
        mutationFn: async ([data]) => {
            return userApis.registerTeacher(data)
        },
        onSuccess() {
            toast.success('Chúc mừng bạn đã đăng ký thành công!')
            localStorage.removeItem('currentQuestion')
            localStorage.removeItem('selectedOptions')
            if (user) setUser({ ...user, status: 'pending' })
            navigate(routes.userDashboard)
        }
    })
}

export const useCourseHistory = (
    count: number,
    options?: Omit<UseQueryOptions<HistoryLeaning>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<HistoryLeaning>({
        ...options,
        enabled: !!count,
        queryKey: ['course-history', count],
        queryFn: () => userApis.courseHistory(count)
    })
}

export const useVoucherByUser = (
    slug: string,
    options?: Omit<UseQueryOptions<IVoucherDiscount>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IVoucherDiscount>({
        ...options,
        queryKey: ['vouchers', slug],
        queryFn: () => userApis.getVoucherUser(slug)
    })
}
