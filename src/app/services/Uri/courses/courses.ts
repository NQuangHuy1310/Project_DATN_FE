const COURSE_URL = 'courses/'

export const courseUri = {
    DETAIL_COURSE_LEANING: (slug: string) => `${COURSE_URL}detail/check/${slug}`,
    DETAIL_COURSE: (slug: string) => `${COURSE_URL}detail/check/${slug}`,
    DETAIL_COURSE_NO_LOGIN: (slug: string) => `${COURSE_URL}detail/${slug}`,

    COURSE_SALE_HOME: `${COURSE_URL}sale-course`,
    GET_DETAIL_QUIZ: (slug: string) => `${COURSE_URL}detail/quiz/${slug}`,
    COURSE_CATEGORY_HOME: `${COURSE_URL}category-course`,
    COURSE_POPULATE: `${COURSE_URL}popular-course`,
    CHECK_BUY_COURSE: (userId: number, courseId: number) => `${COURSE_URL}check-buy-course/${userId}/${courseId}`,

    //COMMENT COURSE
    ADD_COMMENT_COURSE: 'comments/add-comment-lesson',
    GET_COMMENT: (id: number) => `comments/comment-lesson/${id}`
}
