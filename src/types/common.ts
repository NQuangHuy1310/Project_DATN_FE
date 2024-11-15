import { ApiStatusCode } from '@/constants'
import { IconType } from 'react-icons/lib'

export interface IResponse {
    message: string
    data: []
    status: ApiStatusCode
}

export interface IAccountAside {
    title: string
    icon: IconType
    path?: string
}

export interface ICourseCategory {
    id: number
    name: string
    slug: string
    image?: string | null
    description?: string | null
    parent_id?: number | null
    is_active: number
}
export interface ICreateComment {
    id_user: number
    content: string
    parent_id?: number | null
    commentable_id: number
}
export interface IComment {
    id: number
    id_user: number
    content: string
    parent_id?: number
    commentable_id: number
    is_approved?: number
    name: string
    avatar: string
    email: string
    created_at: string
    children: IComment[]
}

export interface Language {
    [key: string]: string
    javascript: string
    typescript: string
    python: string
    java: string
    php: string
}

export interface Language_Snippet {
    [key: string]: string
    javascript: string
    typescript: string
    python: string
    java: string
    php: string
}
interface NotificationData {
    url: string
    type: string
    status: string
    message: string
    course_id: number
    conditions: string | null
    course_name: string
    admin_comments: string | null
}

export interface Notification {
    id: string
    notifiable_type: string
    notifiable_id: number
    type: string
    data: NotificationData
    read_at: string | null
    formatTime?: string
    created_at: string
    updated_at: string
}

export interface CountNotification {
    unreadCount: number
    allNotifications: number
}
