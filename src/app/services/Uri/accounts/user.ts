import { createQueryParams } from '@/lib/utils'

const USER_URL = 'user/'

export const userUri = {
    GET_PROFILE: (email: string) => `${USER_URL}by-email/${email}`,
    PROFILE: `${USER_URL}profile`,
    UPDATE_PROFILE: `${USER_URL}profile`,
    CHANGE_PASSWORD: `${USER_URL}change-password`,
    GET_USER_BY_ID: (userId: number) => `${USER_URL}${userId}/show`,
    GET_BALANCE: (userId: number) => `${USER_URL}balance/${userId}`,
    GET_MY_COURSE_BOUGHT: (
        search?: string,
        category?: string,
        level?: string,
        arrange?: string,
        page?: number,
        perPage?: number
    ) => {
        const queryString = createQueryParams(search, category, level, arrange, page, perPage)
        return `${USER_URL}my-course-bought${queryString}`
    },
    FLOW_TEACHER: `${USER_URL}follow`,
    UN_FOLLOW_TEACHER: `${USER_URL}unfollow`,
    CHECK_FOLLOW_TEACHER: (userId: number, teacherId: number) => `${USER_URL}check-follow/${userId}/${teacherId}`,
    REGISTER_TEACHER: `${USER_URL}register-teacher`,
    COURSE_HISTORY: (count: number) => `${USER_URL}check-history-learning?limit=${count}`,
    VOUCHER_USER: `${USER_URL}vouchers`
}
