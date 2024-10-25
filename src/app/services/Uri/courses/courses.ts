const COURSE_URL = 'courses/'

export const courseUri = {
    DETAIL_COURSE_LEANING: (slug: string) => `${COURSE_URL}detail/check/${slug}`,
    DETAIL_COURSE: (slug: string) => `${COURSE_URL}detail/check/${slug}`,
    DETAIL_COURSE_NO_LOGIN: (slug: string) => `${COURSE_URL}detail/${slug}`,
    COURSE_SALE_HOME: () => `${COURSE_URL}sale-course`
}
