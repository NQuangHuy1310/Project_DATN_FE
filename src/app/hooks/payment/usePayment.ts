import { paymentApi } from '@/app/services/payment'
import routes from '@/configs/routes'
import { IBuyData, IPayment, IVoucher } from '@/types/payment'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const usePaymentCourseBySlug = (
    slug: string,
    options?: Omit<UseQueryOptions<IPayment>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IPayment>({
        ...options,
        queryKey: ['buy-course', slug],
        enabled: !!slug,
        queryFn: () => paymentApi.getCourseForBuy(slug)
    })
}

export const useBuyCourse = (slug: string) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation<any, Error, [number, number, IBuyData]>({
        mutationFn: async ([userId, courseId, buyData]) => {
            return paymentApi.buyCourse(userId, courseId, buyData)
        },
        onSuccess: async (data) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-detail', slug] }),
                queryClient.refetchQueries({ queryKey: ['course-my-bought'] }),
                queryClient.invalidateQueries({ queryKey: ['transaction-user'] })
            ])
            if (data.status === 'success') {
                navigate(routes.myCourses)
            } else if (data.status === 'error') {
                toast.error(data.message)
            }
        }
    })
}

export const useGetNewVoucher = (options?: Omit<UseQueryOptions<IVoucher>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IVoucher>({
        ...options,
        queryKey: ['voucher'],
        queryFn: paymentApi.getNewVoucher
    })
}

export const useApplyVoucher = () => {
    const queryClient = useQueryClient()
    return useMutation<any, Error, [number, string]>({
        mutationFn: async ([userId, voucher]) => {
            return paymentApi.applyVoucher(userId, voucher)
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['buy-course'] })
            if (data.status === 'success') toast.success('Áp mã giảm giá thành công')
        }
    })
}
