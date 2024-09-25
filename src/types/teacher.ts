import { TeacherStatus } from '@/constants'

export interface ITeacher {
    image: string
    name: string
    job: string
    totalCourse: number
    reviewStart: number
    totalReview: number
    status: TeacherStatus
}
