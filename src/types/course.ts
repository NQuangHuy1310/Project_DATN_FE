import { CourseLevel } from '@/constants'
import { IUser } from '@/types/auth'

export interface ICourse {
    image: string
    name: string
    star: number
    level: CourseLevel
    studentCount: number
    totalVideo: number
    totalTime: string
    createdBy: IUser
}
