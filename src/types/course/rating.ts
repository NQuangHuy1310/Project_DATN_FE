import { IUser } from '../auth'
import { ICourse } from './course'

export interface IRating {
    name: string
    user_email: string
    avatar: string
    content: string
    created_at: number
    rate: number
}
export interface IRatingHome {
    user: IUser
    course: ICourse
    content: string

    rate: number
}
export interface IRatingCreate {
    id_user: number
    id_course: number
    content: string
    rate: number
}
