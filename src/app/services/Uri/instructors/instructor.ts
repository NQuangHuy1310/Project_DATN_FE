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

    GET_LESSON_DETAIL: (lessonId: number) => `${INSTRUCTOR_URL}lesson/${lessonId}/detail`,
    UPDATE_POSITION_LESSON: (moduleId: number) => `${INSTRUCTOR_URL}lesson/${moduleId}/update-lesson-position`,

    CREATE_LESSON_DOC: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/add-text-lesson`,
    UPDATE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/update-text-lesson`,
    DELETE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/delete-text-lesson`,

    CREATE_LESSON_VIDEO: (moduleID: number) => `${INSTRUCTOR_URL}lesson/upload-video/${moduleID}`,
    UPDATE_LESSON_VIDEO: (lessonID: number) => `${INSTRUCTOR_URL}lesson/update-lesson-video/${lessonID}`,
    DELETE_LESSON_VIDEO: (lessonID: number) => `${INSTRUCTOR_URL}lesson/delete-lesson-video/${lessonID}`,

    CREATE_LESSON_QUIZ: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/add-quiz`,
    GET_LESSON_QUIZ: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/show-quiz`,
    UPDATE_LESSON_QUIZ: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/update-quiz `,
    DELETE_LESSON_QUIZ: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/delete-quiz`,

    CREATE_QUESTION: (quizID: number) => `${INSTRUCTOR_URL}lesson/quiz/${quizID}/add-question-and-option`,
    UPDATE_QUESTION: (questionID: number) => `${INSTRUCTOR_URL}lesson/quiz/${questionID}/update-question-and-option`,
    DELETE_QUESTION: (questionID: number) => `${INSTRUCTOR_URL}lesson/quiz/${questionID}/delete-question-and-option`
}
