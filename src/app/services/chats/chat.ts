import { chatUri } from '@/app/services/Uri/chats'
import axiosClient from '@/configs/axiosClient'

export const chatApi = {
    searchChat: async (query: string): Promise<any> => {
        return axiosClient.get(chatUri.SEARCH_CHAT(query))
    },
    getConversations: async (limit: number = 10): Promise<any> => {
        return axiosClient.get(chatUri.GET_CONVERSATIONS(limit))
    },
    getConversationById: async (id: number, receiver_id?: number, conversation_id?: number): Promise<any> => {
        return axiosClient.get(chatUri.GET_CONVERSATION_BY_ID(id, receiver_id, conversation_id))
    },
    sendMessage: async (data: any): Promise<any> => {
        return axiosClient.post(chatUri.SEND_MESSAGE, data)
    }
}
