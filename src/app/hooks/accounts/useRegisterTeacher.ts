import { userApis } from '@/app/services/accounts'
import { useUserStore } from '@/app/store/userStore'
import routes from '@/configs/routes'
import { DiscountCode, HistoryLeaning } from '@/types'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useRegisterTeacher = () => {
    const navigate = useNavigate()
    const setUserProfile = useUserStore((state) => state.setUser)
    return useMutation<any, Error>({
        mutationFn: async () => {
            return userApis.registerTeacher()
        },
        onSuccess() {
            localStorage.removeItem('selectedOptions')
            localStorage.removeItem('currentQuestion')
            const userData = localStorage.getItem('user_data')
            if (userData) {
                const parsedUserData = JSON.parse(userData)
                parsedUserData.user_type = 'teacher'
                localStorage.setItem('user_data', JSON.stringify(parsedUserData))
                setUserProfile(parsedUserData)
            }
            navigate(routes.instructorDashboard)
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
