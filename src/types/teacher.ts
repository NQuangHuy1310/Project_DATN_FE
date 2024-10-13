import { TeacherStatus } from '@/constants'
import { ICourse } from '@/types/course'
export interface ITeacher {
    user_id: number
    user_avatar: string
    user_name: string
    total_courses: number
    average_rating: number
    total_ratings: number
    status?: TeacherStatus
}

export interface ITeacherAll {
    teachers: ITeacher[]
    current_page: number
    total_pages: number
    total_count: number
}

export interface ITeacherDetail {
    dataTeacher: ITeacher
    dataCourses: ICourse[]
}
