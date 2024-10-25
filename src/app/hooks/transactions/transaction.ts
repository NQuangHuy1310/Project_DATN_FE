import { ITransaction } from '@/types/transaction'
import { transactionsApi } from '@/app/services/transaction'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useTransactionById = (
    id: number,
    options?: Omit<UseQueryOptions<ITransaction>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ITransaction>({
        ...options,
        queryKey: ['transaction', { id }],
        queryFn: () => transactionsApi.getBalance(id)
    })
}
export const usePostPayment = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ITransaction]>({
        mutationFn: async ([userId, paymentData]) => {
            return transactionsApi.addPayment(userId, paymentData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['transaction'] })
        }
    })
}
