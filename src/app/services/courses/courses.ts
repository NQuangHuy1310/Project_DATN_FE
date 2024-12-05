import axiosClient from '@/configs/axiosClient'
import { courseUri } from '@/app/services/Uri/courses/courses'
import {
    CourseData,
    IAllCourse,
    ICourse,
    ICourseCategory,
    ICourseDetail,
    ICourseWishList,
    IQuizDetail,
    IWishList
} from '@/types/course/course'
import { IBuyData, IComment, ICreateComment } from '@/types'

export const courseApi = {
    allCourses: async (
        category: string,
        level: string,
        arrange: string,
        page: number,
        perPage?: number
    ): Promise<IAllCourse> => {
        return axiosClient.get(courseUri.ALL_COURSES(category, level, arrange, page, perPage))
    },

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

    registerCourse: async (userId: number, courseId: number, data: IBuyData): Promise<IBuyData> => {
        return axiosClient.post(courseUri.REGISTER_COURSE(userId, courseId), data)
    },

    getWishList: async (
        category?: string,
        level?: string,
        arrange?: string,
        page?: number,
        perPage?: number
    ): Promise<ICourseWishList> => {
        return axiosClient.get(courseUri.WISH_LIST(category, level, arrange, page, perPage))
    },
    getWishListBySearch: async (search: string): Promise<ICourseWishList> => {
        return axiosClient.get(courseUri.GET_WISHLIST_BY_SEARCH(search))
    },

    addWishList: async (courseId: number): Promise<IWishList> => {
        return axiosClient.post(courseUri.ADD_WISH_LIST(courseId))
    },

    unWishList: async (courseId: number): Promise<IWishList> => {
        return axiosClient.post(courseUri.UN_WISH_LIST(courseId))
    },

    getCourseBySearch: async (search: string): Promise<IAllCourse> => {
        return axiosClient.get(courseUri.GET_COURSE_BY_SEARCH(search))
    }
}
