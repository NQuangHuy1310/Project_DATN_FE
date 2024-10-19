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

export interface ICourseItem {
    id: number
    name: string
    thumbnail: string | null
    status: 'draft' | 'pending' | 'approved' | 'rejected'
}

export interface ICourses {
    data: ICourseItem[]
    current_page: number
    per_page: number
    total: number
}

export interface IOverviewCourse {
    name: string
    sort_description: string
    description: string
    level: string
    category: {
        id: number
        name: string
    }
    thumbnail: string
    trailer: string
    price: number
    price_sale: number
    is_active: number
    tags: string[]
}

export interface ILesson {
    id: number
    id_module: number
    title: string
    description: string
    content_type: 'document' | 'video'
    position: number
    is_active: number
}

export interface IModule {
    id: number
    id_course: number
    position: number
    title: string
    description: string
    lessons: ILesson[]
}

export interface ILessonDetail {
    title: string
    lesson_description: string | null
    description: string | null
    lesson_thumbnail: string | null
    type_lesson: 'document' | 'video'
    lessonable: {
        id: number
        title: string | null
        type?: 'upload' | 'url'
        url?: string
        video_youtube_id?: string
        duration?: number | null
        content?: string
        description?: string | null
    }
}

export interface IModules {
    modules: IModule[]
}

// ----------------------------- Request
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
    thumbnail?: File
    trailer?: File
    level: string
    id_category: string
    price?: string
    price_sale?: string
    is_active?: number
    tags?: string[]
    _method?: 'PUT'
}

export interface IModuleData {
    title: string
    description: string
}

export interface ILessonDocData {
    title: string
    content: string
    _method?: string
}

export interface ILessonVideoData {
    title: string
    description: string
    check: 'url' | 'upload' | undefined
    video?: File
    video_youtube_id?: string
    duration?: number
    _method?: string
}
