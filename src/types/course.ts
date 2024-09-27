import { IUser } from '@/types/auth'
import { CourseLevel } from '@/constants'

export interface ICourse {
    image: string
    name: string
    star: number
    level: CourseLevel
    studentCount?: number
    totalVideo?: number
    totalTime?: string
    createdBy: IUser
    progressLesson?: number
    totalLesson?: number
}
