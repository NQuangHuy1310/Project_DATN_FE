import axiosClient from '@/configs/axiosClient'
import { courseUri } from '@/app/services/Uri/courses/courses'
import {
    CourseData,
    ICourse,
    ICourseCategory,
    ICourseDetail,
    ICourseWishList,
    IQuizDetail,
    IWishList
} from '@/types/course/course'
import { IBuyData, IComment, ICreateComment } from '@/types'

export const courseApi = {
    detailCourseLeaning: async (slug: string): Promise<CourseData> => {
        return axiosClient.get(courseUri.DETAIL_COURSE_LEANING(slug))
    },

    detailCourse: async (slug: string): Promise<ICourseDetail> => {
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

    todayCourse: async (): Promise<ICourse[]> => {
        return axiosClient.get(courseUri.COURSE_TODAY)
    },

    relatedCourse: async (slug: string): Promise<ICourse[]> => {
        return axiosClient.get(courseUri.COURSE_RELATED(slug))
    },

    courseFree: async (): Promise<ICourse[]> => {
        return axiosClient.get(courseUri.COURSE_FREE)
    },

    addCommentCourse: async (commentData: ICreateComment): Promise<any> => {
        return axiosClient.post(courseUri.ADD_COMMENT_COURSE, commentData)
    },

    getComment: async (id: number): Promise<IComment[]> => {
        return axiosClient.get(courseUri.GET_COMMENT(id))
    },

    checkBuyCourse: async (userId: number, courseId: string): Promise<any> => {
        return axiosClient.get(courseUri.CHECK_BUY_COURSE(userId, courseId))
    },

    registerCourse: async (userId: number, courseId: number, data: IBuyData): Promise<IBuyData> => {
        return axiosClient.post(courseUri.REGISTER_COURSE(userId, courseId), data)
    },

    getWishList: async (page: number, perPage?: number): Promise<ICourseWishList> => {
        return axiosClient.get(courseUri.WISH_LIST(page, perPage))
    },

    addWishList: async (courseId: number): Promise<IWishList> => {
        return axiosClient.post(courseUri.ADD_WISH_LIST(courseId))
    },

    unWishList: async (courseId: number): Promise<IWishList> => {
        return axiosClient.post(courseUri.UN_WISH_LIST(courseId))
    },

    checkWishList: async (courseId: number): Promise<any> => {
        return axiosClient.get(courseUri.CHECK_WISH_LIST(courseId))
    }
}
