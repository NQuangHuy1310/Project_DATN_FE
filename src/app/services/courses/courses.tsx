import axiosClient from '@/configs/axiosClient'
import { courseUri } from '@/app/services/Uri/courses/courses'
import { CourseData, ICourseDetail, ICourseSale, IQuizDetail } from '@/types/course/course'
import { CourseData, ICourseCategory, ICourseDetail, ICourseSale } from '@/types/course/course'

export const courseApi = {
    detailCourseLeaning: async (slug: string): Promise<CourseData> => {
        return axiosClient.get(courseUri.DETAIL_COURSE_LEANING(slug))
    },
    detailCourse: async (slug: string): Promise<ICourseDetail[]> => {
        return axiosClient.get(courseUri.DETAIL_COURSE(slug))
    },
    getDetailQuiz: async (slug: string): Promise<IQuizDetail[]> => {
        return axiosClient.get(courseUri.GET_DETAIL_QUIZ(slug))
    },
    detailCourseNoLogin: async (slug: string): Promise<ICourseDetail> => {
        return axiosClient.get(courseUri.DETAIL_COURSE_NO_LOGIN(slug))
    },
    courseCategoryHome: async (): Promise<ICourseCategory[]> => {
        return axiosClient.get(courseUri.COURSE_CATEGORY_HOME)
    },
    saleCourseHome: async (): Promise<ICourseSale[]> => {
        return axiosClient.get(courseUri.COURSE_SALE_HOME)
    }
}
