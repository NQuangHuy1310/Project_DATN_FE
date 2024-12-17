import { chatApi } from '@/app/services/chats/chat'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useSearchChat = (query: string, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['searchChat', query],
        queryFn: () => chatApi.searchChat(query)
    })
}

export const useGetConversations = (
    limit: number = 10,
    options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['getConversations', limit],
        queryFn: () => chatApi.getConversations(limit)
    })
}

export const useGetConversationById = (
    id: number,
    receiver_id?: number,
    conversation_id?: number,
    options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['getConversationById', id, receiver_id, conversation_id],
        queryFn: () => chatApi.getConversationById(id, receiver_id, conversation_id)
    })
}

export const useSendMessage = (data: any, options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['sendMessage', data],
        queryFn: () => chatApi.sendMessage(data)
    })
}
