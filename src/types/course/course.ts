import { IUser } from '@/types/auth'
import { ICategory } from '@/types/category'

export interface ICourse {
    course_slug?: string
    course_id?: number
    course_thumbnail?: string
    thumbnail?: string
    course_name?: string
    name?: string
    price: number
    price_sale: number
    average_rating?: number
    level?: string
    total_student?: number
    totalVideo?: number
    totalTime?: number
    user?: IUser
    progressLesson?: number
    totalLesson?: number
}
export interface ICourseToday extends ICourse {
    module: IModule[]
    page?: string
}

export interface ILesson {
    title: string
    time: number
    type: 'video' | 'docs' | 'quiz'
}
export interface IModule {
    title: string
    time: number
    lessons: ILesson[]
}

export interface ILessonAbleLeaning {
    id: number
    title: string | null
    lesson_title: string
    description: string | null
    created_at: string
    updated_at: string
    content?: string
    type?: 'upload' | 'url'
    url?: string
    video_youtube_id?: string | null
    duration?: number
}

export interface ILessonLeaning {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string | null
    content_type: 'document' | 'video' | 'quiz'
    lessonable_type: string
    duration: number | null
    lessonable_id: number
    position: number
    is_active: number
    created_at: string
    updated_at: string
    is_completed: number
    last_time_video: number
    lessonable?: ILessonAbleLeaning
}

export interface IModuleLeaning {
    id: number
    id_course: number
    title: string
    description: string
    position: number
    created_at: string
    updated_at: string
    lessons: ILessonLeaning[]
}

export interface NextLessonLeaning {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string | null
    content_type: 'document' | 'video' | 'quiz'
    lessonable_type: string
    lessonable_id: number
    position: number
    is_active: number
    created_at: string
    updated_at: string
    is_completed: number
    last_time_video: number
    lessonable: ILessonAbleLeaning
}

export interface CourseData {
    progress_percent: number
    total_lessons: number
    completed_lessons: number
    modules: IModuleLeaning[]
    next_lesson: NextLessonLeaning
}

export interface ILessonProCess {
    is_completed: 0 | 1
    last_time_video: number | null
    _method?: string
}

export interface ICourseSale {
    user_id: number
    user_name: string
    user_avatar: string
    course_id: number
    course_name: string
    course_thumbnail: string | null
    price: number
    price_sale: number
    total_student: number
    total_lessons: number
    course_duration: string | null
    course_created_at: string
    average_rating: number
}

export interface ICourseDetail {
    id: number
    id_user: number
    id_category: number
    code: string
    name: string
    thumbnail: string
    trailer: string
    description: string
    learned: string | null
    slug: string
    level: string
    duration: string | null
    sort_description: string | null
    price: number
    price_sale: number
    total_student: number
    is_active: number
    is_free: number
    is_trending: number
    created_at: string
    updated_at: string
    status: string
    admin_comments: string | null
    submited_at: string | null
    total_lessons: number
    total_duration: number
    total_duration_vid?: string
    category: ICategory
    tags: any[]
    goals: Goal[]
    requirements: Requirement[]
    audiences: Audience[]
    modules: IModule[]
    user: IUser
}

export interface Goal {
    id: number
    goal: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

// Interface cho Requirement
export interface Requirement {
    id: number
    requirement: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

// Interface cho Audience
export interface Audience {
    id: number
    audience: string
    position: number
    course_id: number
    created_at: string
    updated_at: string
}

export interface ICourseCategory extends ICategory {
    courses: ICourse[]
}
