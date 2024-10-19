import { courseUri } from '@/app/services/Uri/courses/courses'
import axiosClient from '@/configs/axiosClient'
import { CourseData } from '@/types'

export const courseApi = {
    detailCourseLeaning: async (slug: string): Promise<CourseData> => {
        return axiosClient.get(courseUri.DETAIL_COURSE_LEANING(slug))
    }
}
