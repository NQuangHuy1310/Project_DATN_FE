const LESSON_URL = 'lessons/'

export const lessonUri = {
    DETAIL_LESSON: (id: number) => `${LESSON_URL}lesson-detail/${id}`,
    PROCESS_LESSON: (idLesson: number) => `${LESSON_URL}lesson-progress/${idLesson}`,
    DETAIL_QUIZ_LESSON: (idQuiz: number) => `${LESSON_URL}quiz-detail/${idQuiz}`
}
