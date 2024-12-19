// requests
export interface ISendMessageData {
    message: string
    receiver_id: number
}

// responses
export interface IConversation {
    conversations: {
        avatar: string | null
        conversation_id: number
        is_active: number
        is_read: number
        last_message: string
        last_message_time: string
        name: string
        type: 'direct' | 'group'
        unread_messages_count: number
        user_id: number
        user_role: 'instructor' | 'student'
    }[]
}

export interface IConversationById {
    conversation_id: number
    messages: IMessage[]
    receiver_avatar: string | null
    receiver_id: number
    receiver_name: string
    type: 'direct' | 'group'
}

export interface IMessage {
    content: string
    created_at: string
    updated_at: string
    deleted_at: string | null
    is_read_by_other: number
    is_read_by_user: number
    message_id: number
    read_at_by_other: string | null
    read_at_by_user: string | null
    sender: {
        avatar: string | null
        name: string
        id: number
    }
    type: 'text'
}

export interface ISearchMessageData {
    instructors: IInstructor[]
    students: IStudent[]
}

export interface IInstructor {
    avatar: string | null
    id: number
    name: string
}

export interface IStudent {
    avatar: string | null
    id: number
    name: string
}
