import { IUser } from '@/types/auth'
import { ICourse } from '@/types/course/course'

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
