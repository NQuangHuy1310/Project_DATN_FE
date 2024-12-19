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

interface CoursePivot {
    id_phase: number
    id_course: number
}

interface Course {
    id: number
    name: string
    thumbnail: string
    level: string
    price: number
    price_sale: number
    description: string
    progress: number
    is_bought_course: boolean
    slug: string
    pivot: CoursePivot
}

interface Phase {
    id: number
    id_roadmap: number
    name: string
    description: string
    order: number
    created_at: string
    updated_at: string
    courses: Course[]
}

export interface IRoadmap {
    id: number
    user_id: number
    name: string
    description: string
    created_at: string
    updated_at: string
    thumbnail: string
    sort_description: string
    phases: Phase[]
}

export interface ITeacherDetail {
    dataTeacher: ITeacher
    dataCourses: ICourse[]
    roadmaps: IRoadmap[]
    totalFollower: number
    totalStudent: number
}
