import axios from 'axios'
import axiosClient from '@/configs/axiosClient'

import {
    ICheckQuizLeaning,
    ICheckQuizLeaningPost,
    ILessonLeaning,
    ILessonProCess,
    IQuizLeaning,
    IQuizProCess
} from '@/types/course/course'
import { lessonUri } from '@/app/services/Uri/courses/lessons'
import { backendUrl } from '@/configs/baseUrl'
import { getAccessTokenFromLocalStorage } from '@/lib'

export const lessonApi = {
    detailLessonLeaning: async (id: number): Promise<ILessonLeaning> => {
        const response = await axios.get(`${backendUrl}${lessonUri.DETAIL_LESSON(id)}`, {
            headers: {
                Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`
            }
        })
        return response.data.data
    },
    lessonProcessLeaning: async (idLesson: number, data: ILessonProCess): Promise<ILessonProCess> => {
        return axiosClient.post(lessonUri.PROCESS_LESSON(idLesson), data)
    },
    lessonQuizLeaning: async (id: number): Promise<IQuizLeaning> => {
        const response = await axios.get(`${backendUrl}${lessonUri.DETAIL_QUIZ_LESSON(id)}`, {
            headers: {
                Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`
            }
        })
        return response.data.data
    },
    checkQuizLeaning: async (data: ICheckQuizLeaningPost): Promise<ICheckQuizLeaning> => {
        return axiosClient.post(lessonUri.CHECK_QUIZ_LESSON, data)
    },
    quizProcessLeaning: async (idQuiz: number, data: IQuizProCess): Promise<IQuizProCess> => {
        return axiosClient.post(lessonUri.PROCESS_QUIZ(idQuiz), data)
    },
    getQuizLeaning: async (idUser: number, idQuiz: number): Promise<ICheckQuizLeaningPost> => {
        return axiosClient.get(lessonUri.GET_QUIZ_LEANING(idUser, idQuiz))
    },
    checkCodeLeaning: async (idCode: number, output: string): Promise<any> => {
        return axiosClient.post(lessonUri.CHECK_CODE_LESSON(idCode), { output })
    }
}
