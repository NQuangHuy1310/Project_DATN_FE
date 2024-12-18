import { chatApi } from '@/app/services/chats/chat'
import { IConversation, IConversationById, ISendMessageData } from '@/types/chats'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useSearchChat = (query: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['searchChat', query],
        queryFn: () => chatApi.searchChat(query)
    })
}

export const useGetConversations = (
    limit: number = 10,
    options?: Omit<UseQueryOptions<IConversation>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['getConversations', limit],
        queryFn: () => chatApi.getConversations(limit)
    })
}

export const useGetConversationById = (
    receiver_id?: number,
    conversation_id?: number,
    options?: Omit<UseQueryOptions<IConversationById>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        enabled: !!receiver_id || !!conversation_id,
        queryKey: ['getConversationById', receiver_id, conversation_id],
        queryFn: () => chatApi.getConversationById(receiver_id, conversation_id)
    })
}

export const useSendMessage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ISendMessageData) => chatApi.sendMessage(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getConversations'] })
        }
    })
}
