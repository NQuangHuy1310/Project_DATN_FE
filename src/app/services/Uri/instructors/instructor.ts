const INSTRUCTOR_URL = 'teacher/manage/'

export const instructorUri = {
    CREATE_COURSE: 'teacher/course',
    GET_COURSES: 'teacher/course',
    SUBMIT_COURSE: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/submit`,
    TARGET_COURSE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/target-student`,
    OVERVIEW_COURSE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/overview`,

    GET_MODULE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/curriculum`,
    CREATE_MODULE: (courseId: string) => `${INSTRUCTOR_URL}module/${courseId}/add`,
    UPDATE_MODULE: (moduleId: string) => `${INSTRUCTOR_URL}module/${moduleId}/update`,
    DELETE_MODULE: (moduleId: string) => `${INSTRUCTOR_URL}module/${moduleId}/delete`,

    GET_LESSON_DETAIL: (lessonId: number) => `lessons/lesson-detail/${lessonId}`,

    CREATE_LESSON_DOC: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/add-text-lesson`,
    UPDATE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/update-text-lesson`,
    DELETE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/delete-text-lesson`,

    CREATE_LESSON_VIDEO: (moduleID: number) => `${INSTRUCTOR_URL}lesson/upload-video/${moduleID}`
}
