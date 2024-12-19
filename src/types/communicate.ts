import { IUser } from '@/types/auth'

export interface IMessage {
    user: Omit<IUser, 'email' | 'id'>
    text: string
    time: string
    fromUser: boolean
}

export interface IAccoutMessage {
    user: Omit<IUser, 'email' | 'id' | 'user_type'>
    time: number
    message: string
    is_Read: boolean
}
