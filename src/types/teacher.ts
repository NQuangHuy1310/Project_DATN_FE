import { ICourse } from '@/types/course/course'
export interface ITeacher {
    id: number
    avatar: string
    name: string
    total_courses: number
    total_ratings: number
    total_comments?: number
    ratings_avg_rate: number
    follow?: boolean
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
    totalFollower: number
    totalStudent: number
}
