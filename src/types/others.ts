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

export interface IBank {
    id: number
    name: string
    code: string
    bin: string
    shortName: string
}

export interface IBankData {
    code: string
    desc: string
    data: IBank[]
}

export interface QuestionTeacher {
    id: number
    title: string
    description: string
    question: string
    options: string[]
}
