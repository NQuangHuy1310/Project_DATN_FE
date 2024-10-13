const INSTRUCTOR_URL = 'teacher/'

export const instructorUri = {
    CREATE_COURSE: `${INSTRUCTOR_URL}course`,
    TARGET_COURSE: (courseId: string) => `${INSTRUCTOR_URL}manage/${courseId}/target-student`,
    OVERVIEW_COURSE: (courseId: string) => `${INSTRUCTOR_URL}manage/${courseId}/overview`
}
