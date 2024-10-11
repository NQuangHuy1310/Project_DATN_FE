import { ICourseCategory } from '@/types/common'

// Response
export interface ICreateCourse {
    id: number
    name: string
    slug: string
    id_user: number
    id_category: string
    category: ICourseCategory
}

// Request
export interface ICreateCourseData {
    name: string
    id_category: string
}
