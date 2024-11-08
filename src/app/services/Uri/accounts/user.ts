const USER_URL = 'user/'

export const userUri = {
    PROFILE: `${USER_URL}profile`,
    UPDATE_PROFILE: `${USER_URL}profile`,
    CHANGE_PASSWORD: `${USER_URL}change-password`,
    GET_BALANCE: (userId: number) => `${USER_URL}balance/${userId}`,
    GET_MY_COURSE_BOUGHT: `${USER_URL}my-course-bought`,
    FLOW_TEACHER: `${USER_URL}follow`,
    UN_FOLLOW_TEACHER: `${USER_URL}unfollow`,
    CHECK_FOLLOW_TEACHER: (userId: number, teacherId: number) => `${USER_URL}check-follow/${userId}/${teacherId}`
}
