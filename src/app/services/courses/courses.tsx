import axiosClient from '@/configs/axiosClient'
import { courseUri } from '@/app/services/Uri/courses/courses'
import { CourseData, ICourse, ICourseCategory, ICourseDetail, IQuizDetail } from '@/types/course/course'
import { IComment, ICreateComment } from '@/types/comment'

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
    saleCourseHome: async (): Promise<ICourse[]> => {
        return axiosClient.get(courseUri.COURSE_SALE_HOME)
    },
    populateCourse: async (): Promise<ICourse[]> => {
        return axiosClient.get(courseUri.COURSE_POPULATE)
    },
    addCommentCourse: async (commentData: ICreateComment): Promise<any> => {
        return axiosClient.post(courseUri.ADD_COMMENT_COURSE, commentData)
    },
    getComment: async (id: number): Promise<IComment[]> => {
        return axiosClient.get(courseUri.GET_COMMENT(id))
    },
    checkBuyCourse: async (userId: number, courseId: number): Promise<any> => {
        return axiosClient.get(courseUri.CHECK_BUY_COURSE(userId, courseId))
    }

}
