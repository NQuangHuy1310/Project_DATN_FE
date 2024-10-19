import axiosClient from '@/configs/axiosClient'
import { lessonUri } from '@/app/services/Uri/courses/lessons'
import { ILessonLeaning, ILessonProCess } from '@/types'

export const lessonApi = {
    detailLessonLeaning: async (id: number): Promise<ILessonLeaning> => {
        return axiosClient.get(lessonUri.DETAIL_LESSON(id))
    },
    lessonProcess: async (idLesson: number, data: ILessonProCess): Promise<ILessonProCess> => {
        return axiosClient.post(lessonUri.LESSON_PROCESS(idLesson), data)
    }
}
