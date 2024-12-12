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
    is_follow?: boolean
}

export interface ITeacherAll {
    data: ITeacher[]
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

export interface HistoryBuyCourse {
    current_page: number
    data: HistoryBuyCourseData[]
    path: string
    per_page: number
    total: number
}

interface HistoryBuyCourseData {
    id: number
    price: string
    status: string
    created_at: string
    student_name: string
    thumbnail: string
    course_name: string
}
