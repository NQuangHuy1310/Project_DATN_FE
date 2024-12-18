const CHAT_URL = '/chats'

export const chatUri = {
    SEARCH_CHAT: (query: string) => `${CHAT_URL}/search?s=${query}`,
    GET_CONVERSATIONS: (limit: number = 10) => `${CHAT_URL}/conversations?limit=${limit}`,
    GET_CONVERSATION_BY_ID: (limit: number = 10, receiver_id?: number, conversation_id?: number) =>
        `${CHAT_URL}/conversations/private?limit=${limit}${receiver_id ? `&receiver_id=${receiver_id}` : ''}${conversation_id ? `&conversation_id=${conversation_id}` : ''}`,
    SEND_MESSAGE: `${CHAT_URL}/send-private-message`
}
