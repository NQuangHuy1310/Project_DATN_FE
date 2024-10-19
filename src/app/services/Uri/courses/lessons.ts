const LESSON_URL = 'lessons/'

export const lessonUri = {
    DETAIL_LESSON: (id: number) => `${LESSON_URL}lesson-detail/${id}`,
    LESSON_PROCESS: (idLesson: number) => `${LESSON_URL}lesson-progress/${idLesson}`
}
