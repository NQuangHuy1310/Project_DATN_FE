const INSTRUCTOR_URL = 'teachers/'

export const instructorClientUri = {
    ALL_INSTRUCTOR: (page: number, perPage?: number) =>
        `${INSTRUCTOR_URL}?page=${page}${perPage ? `&perPage=${perPage}` : ''}`,
    DETAIL_INSTRUCTOR: (instructorId: number) => `${INSTRUCTOR_URL}list-courses/${instructorId}`,
    GET_TEACHER_MONTH: `${INSTRUCTOR_URL}list-teacher-month`,
    GET_TEACHER_BY_SEARCH: (search: string) => `${INSTRUCTOR_URL}?search=${search}`
}
