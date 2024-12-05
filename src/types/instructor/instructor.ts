import { IUser } from '@/types/auth'
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

export type ICourseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | undefined

export interface IManageMenuCourse {
    course_target: boolean
    course_curriculum: boolean
    course_overview: boolean
    course_status: ICourseStatus
}

export interface ICourseItem {
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
    price: string
    price_sale: string
    total_student: number
    is_active: number
    is_free: number
    is_trending: number
    created_at: string
    updated_at: string
    status: string
    admin_comments: string | null
    submited_at: string
    user: IUser
    category: ICourseCategory
    tags: any[]
}

export interface ICourses {
    data: ICourseItem[]
    current_page: number
    per_page: number
    total: number
}

export interface ICourseApproved {
    id: number
    name: string
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
    content_type: 'document' | 'video' | 'quiz' | 'coding'
    position: number
    is_active: number
    is_preview?: number
    lessonable: {
        id: number
        title: string | null
        type?: 'upload' | 'url'
        url?: string
        video_youtube_id?: string
        duration?: number | null
        content?: string
        description?: string | null
        resourse_path?: string | null
        hints?: string
        language?: string
        output?: string
        sample_code?: string
        statement: string
        result_code?: string
    }
}

export interface IModule {
    id: number
    id_course: number
    position: number
    title: string
    description: string
    total_lessons: number
    lessons: ILesson[]
    quiz: ILessonQuiz
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
        description?: string
        resourse_path?: string | null
        language?: string
    }
}

export interface ILessonQuiz {
    id: number
    id_module: number
    total_points: number
    title: string
    description: string
}

export interface IModules {
    modules: IModule[]
}

export interface ILessonQuiz {
    id: number
    id_module: number
    total_points: number
    title: string
    description: string
}

export interface IOption {
    id: number
    id_question: number
    option: string
    image_url: string
    is_correct: number
    created_at: string
    updated_at: string
}

export interface IQuestion {
    id: number
    id_quiz: number
    question: string
    type: 'one_choice' | 'multiple_choice'
    image_url: string | null
    points: number
    options: IOption[]
}

export interface IQuiz {
    quiz: {
        id: number
        id_module: number
        total_points: number
        title: string
        description: string
        questions: IQuestion[]
    }
}

export interface IUpdateLessonPosition {
    id: number
    position: number
}

export interface IUpdatePositionLessonData {
    lessons: IUpdateLessonPosition[]
    _method?: string
}

export interface IChangeLessonType {
    new_type: 'video' | 'upload' | 'document'
    check?: 'upload' | 'video'
    video_youtube_id?: string
    duration?: string
    video?: File
    content?: string
}

export interface IUpdateModulePosition {
    id: number
    position: number
}

export interface IUpdatePositionModuleData {
    modules: IUpdateModulePosition[]
    _method?: string
}

// ----------- Request -------------------
export interface ICreateCourseData {
    name: string
    id_category: string
}

export interface ICourseStatusData {
    status: 'draft' | 'pending' | 'approved' | 'rejected'
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
    thumbnail?: File | string
    trailer?: File | string
    level: string
    id_category: string
    price?: number
    price_sale?: number
    is_active?: string
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
    resourse_path?: File
    _method?: string
    is_preview?: number
}

export interface ILessonVideoData {
    title: string
    description: string
    check: 'url' | 'upload' | undefined
    video?: File
    video_youtube_id?: string
    duration?: number
    _method?: string
    is_preview?: number
}

export interface ILessonQuizData {
    title: string
    description: string
    _method?: string
    is_preview?: number
}

interface QuestionOptionData {
    id?: number
    text: string
    image?: File | string
}

interface QuestionData {
    question: string
    type: 'one_choice' | 'multiple_choice'
    image?: File | string
    correct_answer: number[] | number
}

export interface IQuestionData {
    questions: {
        question: QuestionData
        options: QuestionOptionData
    }[]
    _method?: string
}

export interface IChangeLessonTypeData {
    new_type: 'document' | 'video'
    title: string
    check?: 'url' | 'upload'
    duration?: number
    video?: File
    content?: string
    description?: string
}

export interface RevenueData {
    total_revenue: number
    monthly_revenue: {
        [key: number]: number // Từ 1 đến 12 (tháng)
    }
    total_students: number
    total_courses: number
    top_courses: ICourseItem[]
}

export interface StudentsCourse {
    total_students: number
    students: {
        current_page: number
        data: {
            id: number
            id_user: number
            progress_percent: number
            completed_at: string
            created_at: string
            updated_at: string
            user: {
                id: number
                name: string
                avatar: string | null
            }
        }[]
    }
}

export interface RatingsCourse {
    total_ratings: number
    ratings: {
        current_page: number
        data: ratingCourse[]
    }
}

export interface ratingCourse {
    id: number
    id_user: number
    content: string
    rate: number
    created_at: string
    updated_at: string
    user: {
        id: number
        name: string
        avatar: string | null
    }
}

export interface ILessonCodingData {
    title: string
    description: string
    language: string
    _method?: string
}

export interface ICodingContentData {
    statement: string
    hints?: string
    sample_code: string
    output: string
    result_code: string
    _method?: string
}
