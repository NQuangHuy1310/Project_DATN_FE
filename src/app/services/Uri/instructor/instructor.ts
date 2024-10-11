const INSTRUCTOR_URL = 'teacher/'

export const instructorUri = {
    CREATE_COURSE: `${INSTRUCTOR_URL}course`,
    TARGET_COURSE: (courseId: number) => `${INSTRUCTOR_URL}manage/${courseId}/target-student`
}
