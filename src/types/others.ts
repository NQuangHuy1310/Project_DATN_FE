import { IUser } from '@/types/auth'
import { ICourse } from '@/types/course/course'
import { IPosts } from '@/types/post'

export interface ICategory {
    id: number
    name: string
    parent_id?: string
    image: string
    slug: string
    description: string
}

export interface IBanner {
    id: number
    title: string
    redirect_url: string
    image: string
    content: string
    position: number
    start_time: Date
    end_time: Date
}
export interface IBank {
    id: number
    name: string
    code: string
    bin: string
    shortName: string
}

export interface IBankData {
    code: string
    desc: string
    data: IBank[]
}

export interface QuestionTeacher {
    id: number
    title: string
    description: string
    question: string
    options: string[]
}

interface CourseCertification extends ICourse {
    user: IUser
}

export interface CertificateData {
    id: number
    code: string
    user_id: number
    course_id: number
    completion_date: string
    image_url: string
    pdf_url: string
    created_at: string
    updated_at: string
    course: CourseCertification
}

export interface LessonHistory {
    id: number
    id_module: number
    title: string
    thumbnail: string | null
    description: string | null
    content_type: 'document' | 'video'
    lessonable_type: string
    lessonable_id: number
    slug: string
    position: number
    created_at: string
    updated_at: string
}

export interface HistoryLeaning {
    course: LessonHistory[]
    total_lessons: number
}

interface ICoursePath {
    id: number
    name: string
    slug: string
    thumbnail: string
    id_category: number
    id_user: number
    progress: {
        id_course: number
        progress_percent: number
        id_user: number
    }[]
}

export interface ICategoryLeaningPath extends ICategory {
    courses: ICoursePath[]
}

export interface IDataSearch {
    courses: ICourse[]
    teachers: IUser[]
    posts: IPosts[]
}
