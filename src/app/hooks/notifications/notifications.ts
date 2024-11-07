import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { notificationApi } from '@/app/services/notifications'

export const useGetNotification = (
    count: number = 10,
    options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['notifications', count],
        queryFn: () => notificationApi.getNotifications(count)
    })
}

export const useGetAllAndUnRead = (options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['getAllAndUnRead'],
        queryFn: notificationApi.getAllAndUnRead
    })
}

export const useMarkAsRead = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (notificationID: number) => {
            return notificationApi.markAsRead(notificationID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notifications'] })
        }
    })
}

export const useDeleteNotification = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (notificationID: number) => {
            return notificationApi.deleteNotification(notificationID)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['notifications'] })
        }
    })
}
