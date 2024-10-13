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

export interface IOverviewCourse {
    admin_comments: string | null
    code: string
    created_at: string
    description: string | null
    duration: number | null
    id: number
    id_category: number
    id_user: number
    is_active: boolean
    is_free: boolean
    is_trending: boolean
    learned: string | null
    level: string | null
    name: string
    price: number | null
    price_sale: number | null
    slug: string
    sort_description: string | null
    status: string
    submited_at: string | null
    tags: string[]
    thumbnail: string | null
    total_student: number
    trailer: string | null
    updated_at: string
}

// Request
export interface ICreateCourseData {
    name: string
    id_category: string
}

export interface ITargetCourse {
    goals: {
        goal: string
        position: number
    }[]
    requirements: {
        requirement: string
        position: number
    }[]
    audiences: {
        audience: string
        position: number
    }[]
}

export interface IOverviewCourseData {
    name: string
    description: string | null
    thumbnail: File
    trailer: File
    level: string
    id_category: string
    price?: number
    price_sale?: number
    is_active?: number
    tags?: string[]
}
