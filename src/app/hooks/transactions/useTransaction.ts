import { IHistory, IRequestWithDrawData, ITeacherBalance, ITeacherHistoryDraw, ITransaction } from '@/types/transaction'
import { transactionsClientApi, transactionApi } from '@/app/services/transaction'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useTransactionById = (
    id: number,
    options?: Omit<UseQueryOptions<ITransaction>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ITransaction>({
        ...options,
        queryKey: ['transaction-user', { id }],
        queryFn: () => transactionsClientApi.getBalance(id)
    })
}

export const usePostPaymentClient = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ITransaction]>({
        mutationFn: async ([userId, paymentData]) => {
            return transactionsClientApi.addPayment(userId, paymentData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['transaction-user'] })
        }
    })
}

export const useGetHistoryClient = (
    id: number,
    options?: Omit<UseQueryOptions<IHistory[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IHistory[]>({
        ...options,
        queryKey: ['history-transaction', { id }],
        queryFn: () => transactionsClientApi.getHistory(id)
    })
}

export const useGetBalance = (
    userId: number,
    options?: Omit<UseQueryOptions<ITeacherBalance>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['transaction-instructor', userId],
        queryFn: () => transactionApi.getBalance(userId)
    })
}

export const useQuestWithdraw = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IRequestWithDrawData]>({
        mutationFn: async ([userId, data]) => {
            return transactionApi.requestWithdraw(userId, data)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['transaction-instructor'] })
            await queryClient.invalidateQueries({ queryKey: ['instructor-transaction-history'] })
        }
    })
}

export const useGetHistoryWithDraw = (
    userId: number,
    options?: Omit<UseQueryOptions<ITeacherHistoryDraw>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['instructor-transaction-history', userId],
        queryFn: () => transactionApi.getHistoryWithDraw(userId)
    })
}
