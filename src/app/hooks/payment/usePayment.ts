import { paymentApi } from '@/app/services/payment'
import { IBuyData, IPayment } from '@/types/payment'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

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
export const useBuyCourse = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, number, IBuyData]>({
        mutationFn: async ([userId, courseId, buyData]) => {
            return paymentApi.buyCourse(userId, courseId, buyData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['buy-course'] })
        }
    })
}
