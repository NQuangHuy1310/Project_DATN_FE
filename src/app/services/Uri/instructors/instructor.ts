const INSTRUCTOR_URL = 'teacher/manage/'

export const instructorUri = {
    // Course
    CREATE_COURSE: 'teacher/course',
    GET_COURSES_APPROVED: 'teacher/course/approved',
    GET_COURSES: (limit: number, search: string, sort: string, page: number, perPage: number) =>
        `teacher/course?page=${page}${perPage ? `&perPage=${perPage}` : ''}&limit=${limit}&search=${search}&sort=${sort}`,
    SUBMIT_COURSE: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/submit`,
    DISABLE_COURSE: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/disable-course`,
    MANAGE_MENU: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/manage-menu`,
    ENABLE_COURSE: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/enable-course`,
    DELETE_COURSE: (courseID: string) => `${INSTRUCTOR_URL}${courseID}/delete-course`,
    TARGET_COURSE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/target-student`,
    OVERVIEW_COURSE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/overview`,

    // Module
    GET_MODULE: (courseId: string) => `${INSTRUCTOR_URL}${courseId}/curriculum`,
    CREATE_MODULE: (courseId: string) => `${INSTRUCTOR_URL}module/${courseId}/add`,
    UPDATE_MODULE: (moduleId: string) => `${INSTRUCTOR_URL}module/${moduleId}/update`,
    DELETE_MODULE: (moduleId: string) => `${INSTRUCTOR_URL}module/${moduleId}/delete`,
    UPDATE_POSITION_MODULE: (courseId: string) => `${INSTRUCTOR_URL}module/${courseId}/update-module-position`,

    GET_LESSON_DETAIL: (lessonId: number) => `${INSTRUCTOR_URL}lesson/${lessonId}/detail`,
    UPDATE_POSITION_LESSON: (moduleId: number) => `${INSTRUCTOR_URL}lesson/${moduleId}/update-lesson-position`,
    CHANGE_LESSON_TYPE: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/change-type`,

    // Lesson type doc
    CREATE_LESSON_DOC: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/add-text-lesson`,
    UPDATE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/update-text-lesson`,
    DELETE_LESSON_DOC: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/delete-text-lesson`,

    // Lesson type video
    CREATE_LESSON_VIDEO: (moduleID: number) => `${INSTRUCTOR_URL}lesson/upload-video/${moduleID}`,
    UPDATE_LESSON_VIDEO: (lessonID: number) => `${INSTRUCTOR_URL}lesson/update-lesson-video/${lessonID}`,
    DELETE_LESSON_VIDEO: (lessonID: number) => `${INSTRUCTOR_URL}lesson/delete-lesson-video/${lessonID}`,

    // Lesson type quiz
    CREATE_LESSON_QUIZ: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/add-quiz`,
    GET_LESSON_QUIZ: (moduleID: number) => `${INSTRUCTOR_URL}lesson/${moduleID}/show-quiz`,
    UPDATE_LESSON_QUIZ: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/update-quiz `,
    DELETE_LESSON_QUIZ: (lessonID: number) => `${INSTRUCTOR_URL}lesson/${lessonID}/delete-quiz`,

    // Question
    CREATE_QUESTION: (quizID: number) => `${INSTRUCTOR_URL}lesson/quiz/${quizID}/add-question-and-option`,
    UPDATE_QUESTION: (questionID: number) => `${INSTRUCTOR_URL}lesson/quiz/${questionID}/update-question-and-option`,
    DELETE_QUESTION: (questionID: number) => `${INSTRUCTOR_URL}lesson/quiz/${questionID}/delete-question-and-option`,

    // Statistic
    STATISTIC: `${INSTRUCTOR_URL}statistic`,
    GET_STUDENTS: (courseID: number) => `${INSTRUCTOR_URL}statistic/get-students?course=${courseID}`,
    GET_RATINGS: (courseID: number) => `${INSTRUCTOR_URL}statistic/get-ratings?course=${courseID}`
}
