import { IUser } from '@/types/auth'
import { notificationTypes } from '@/constants'

export interface INotificationMessage {
    notificationType: notificationTypes
    title: string
    message: string
    senderBy: IUser
    sentAt: string
    isRead: boolean
}
