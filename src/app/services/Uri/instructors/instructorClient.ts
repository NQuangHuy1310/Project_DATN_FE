const INSTRUCTOR_URL = 'teachers/'

export const instructorClientUri = {
    ALL_INSTRUCTOR: (page: number, perPage?: number) =>
        `${INSTRUCTOR_URL}?page=${page}${perPage ? `&perPage=${perPage}` : ''}`,
    DETAIL_INSTRUCTOR: (instructorId: number) => `${INSTRUCTOR_URL}list-courses/${instructorId}`
}
