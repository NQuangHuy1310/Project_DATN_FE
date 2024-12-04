import { createQueryParams } from '@/lib/utils'
const COURSE_URL = 'courses/'

export const courseUri = {
    DETAIL_COURSE_LEANING: (slug: string) => `${COURSE_URL}detail/check/${slug}`,
    DETAIL_COURSE: (slug: string) => `${COURSE_URL}detail-login/${slug}`,
    DETAIL_COURSE_NO_LOGIN: (slug: string) => `${COURSE_URL}detail-no-login/${slug}`,

    ALL_COURSES: (
        search?: string,
        category?: string,
        level?: string,
        arrange?: string,
        page?: number,
        perPage?: number
    ) => {
        const queryString = createQueryParams(search, category, level, arrange, page, perPage)
        return `${COURSE_URL}list-course-all${queryString}`
    },

    COURSE_SALE_HOME: `${COURSE_URL}sale-course`,
    GET_DETAIL_QUIZ: (slug: string) => `${COURSE_URL}detail/quiz/${slug}`,
    COURSE_CATEGORY_HOME: `${COURSE_URL}category-course`,
    COURSE_POPULATE: `${COURSE_URL}popular-course`,
    COURSE_RELATED: (slug: string) => `${COURSE_URL}related-course/${slug}`,
    COURSE_FREE: `${COURSE_URL}free-course`,
    COURSE_TODAY: `${COURSE_URL}today-new`,
    REGISTER_COURSE: (userId: number, courseId: number) => `transactions/register-course/${userId}/${courseId}`,
    //COMMENT COURSE
    ADD_COMMENT_COURSE: 'comments/add-comment-lesson',
    GET_COMMENT: (id: number) => `comments/comment-lesson/${id}`,
    //WISHLIST
    WISH_LIST: (
        search?: string,
        category?: string,
        level?: string,
        arrange?: string,
        page?: number,
        perPage?: number
    ) => {
        const queryString = createQueryParams(search, category, level, arrange, page, perPage)
        return `${COURSE_URL}favorite${queryString}`
    },
    ADD_WISH_LIST: (courseId: number) => `${COURSE_URL}favorite/${courseId}`,
    UN_WISH_LIST: (courseId: number) => `${COURSE_URL}unfavorite/${courseId}`
}
