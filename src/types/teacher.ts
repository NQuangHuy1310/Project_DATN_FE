import { TeacherStatus } from '@/constants'

export interface ITeacher {
    user_id?: number
    user_avatar: string
    user_name: string
    total_courses: number
    average_rating: string
    total_ratings: number
    status?: TeacherStatus
}
