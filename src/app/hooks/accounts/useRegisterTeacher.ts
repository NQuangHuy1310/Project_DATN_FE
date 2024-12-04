import routes from '@/configs/routes'
import { toast } from 'sonner'
import { userApis } from '@/app/services/accounts'
import { useNavigate } from 'react-router-dom'
import { IRegisterInstructor } from '@/types/user'
import { DiscountCode, HistoryLeaning } from '@/types'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useRegisterTeacher = () => {
    const navigate = useNavigate()
    return useMutation<any, Error, IRegisterInstructor>({
        mutationFn: async (data) => {
            return userApis.registerTeacher(data)
        },
        onSuccess() {
            toast.success('Chúc mừng bạn đã đăng ký thành công!')
            localStorage.removeItem('currentQuestion')
            localStorage.removeItem('selectedOptions')
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

export const useVoucherByUser = (options?: Omit<UseQueryOptions<DiscountCode[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<DiscountCode[]>({
        ...options,
        queryKey: ['vouchers'],
        queryFn: () => userApis.getVoucherUser()
    })
}
