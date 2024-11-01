import { IUser } from '@/types/auth'
import { notificationTypes } from '@/constants'

export interface ICategory {
    id: number
    name: string
    parent_id?: string
    image: string
    slug: string
    description: string
}

export interface IBanner {
    id: number
    title: string
    redirect_url: string
    image: string
    content: string
    position: number
    start_time: Date
    end_time: Date
}

export interface INotificationMessage {
    notificationType: notificationTypes
    title: string
    message: string
    senderBy: IUser
    sentAt: string
    isRead: boolean
}
