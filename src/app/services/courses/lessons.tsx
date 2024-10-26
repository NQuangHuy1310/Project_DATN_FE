import axiosClient from '@/configs/axiosClient'
import { lessonUri } from '@/app/services/Uri/courses/lessons'
import { ILessonLeaning, ILessonProCess } from '@/types/course/course'
import { IQuiz } from '@/types/instructor'

export const lessonApi = {
    detailLessonLeaning: async (id: number): Promise<ILessonLeaning> => {
        return axiosClient.get(lessonUri.DETAIL_LESSON(id))
    },
    lessonProcess: async (idLesson: number, data: ILessonProCess): Promise<ILessonProCess> => {
        return axiosClient.post(lessonUri.PROCESS_LESSON(idLesson), data)
    },
    lessonQuizLeaning: async (id: number): Promise<IQuiz> => {
        return axiosClient.get(lessonUri.DETAIL_QUIZ_LESSON(id))
    }
}
