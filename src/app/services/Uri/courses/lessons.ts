const LESSON_URL = 'lessons/'

export const lessonUri = {
    DETAIL_LESSON: (id: number) => `${LESSON_URL}lesson-detail/${id}`,
    PROCESS_LESSON: (idLesson: number) => `${LESSON_URL}lesson-progress/${idLesson}`,
    DETAIL_QUIZ_LESSON: (idQuiz: number) => `${LESSON_URL}quiz-detail/${idQuiz}`,
    CHECK_QUIZ_LESSON: `${LESSON_URL}quiz/check-quiz`,
    CHECK_CODE_LESSON: (idCode: number) => `${LESSON_URL}coding/${idCode}/check-coding`,
    PROCESS_QUIZ: (idQuiz: number) => `${LESSON_URL}quiz/quiz-progress/${idQuiz}`,
    GET_QUIZ_LEANING: (idUser: number, idQuiz: number) => `${LESSON_URL}quiz/result/${idUser}/${idQuiz}`,
    //PREVIEW
    LESSON_PREVIEW: (idLesson: number) => `${LESSON_URL}preview/${idLesson}`
}
