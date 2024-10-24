import axiosClient from '@/configs/axiosClient'
import { courseUri } from '@/app/services/Uri/courses/courses'
import { CourseData, ICourseSale } from '@/types/course/course'

export const courseApi = {
    detailCourseLeaning: async (slug: string): Promise<CourseData> => {
        return axiosClient.get(courseUri.DETAIL_COURSE_LEANING(slug))
    },
    saleCourseHome: async (): Promise<ICourseSale[]> => {
        return axiosClient.get(courseUri.COURSE_SALE_HOME())
    }
}
