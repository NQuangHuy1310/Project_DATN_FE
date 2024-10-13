import { IUser } from '@/types/auth'
import { CourseLevel } from '@/constants'

export interface ICourse {
    course_id: number
    course_thumbnail: string
    course_name: string
    average_rating: number
    level: CourseLevel
    total_student?: number
    totalVideo?: number
    totalTime?: string
    createdBy: IUser
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
