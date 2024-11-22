import { lessonApi } from '@/app/services/courses/lessons'
import {
    ICheckQuizLeaningPost,
    ILessonLeaning,
    ILessonProCess,
    IQuizLeaning,
    IQuizProCess
} from '@/types/course/course'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useLessonById = (
    id: number,
    isQuiz: boolean,
    options?: Omit<UseQueryOptions<ILessonLeaning>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ILessonLeaning>({
        ...options,
        queryKey: ['lesson-leaning', id],
        enabled: !!id && isQuiz == false,
        queryFn: () => lessonApi.detailLessonLeaning(id)
    })
}

export const useQuizLessonById = (
    id: number,
    isQuiz: boolean,
    options?: Omit<UseQueryOptions<IQuizLeaning>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IQuizLeaning>({
        ...options,
        queryKey: ['lesson-quiz-leaning', id],
        enabled: !!id && isQuiz == true,
        queryFn: () => lessonApi.lessonQuizLeaning(id)
    })
}

export const useUpdateLessonProCess = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonProCess]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return lessonApi.lessonProcessLeaning(lessonId, lessonData)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-history', 5] }),
                queryClient.refetchQueries({ queryKey: ['course-my-bought'] })
            ])
        }
    })
}

export const useUpdateQuizProCess = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IQuizProCess]>({
        mutationFn: async ([quizId, quizData]) => {
            return lessonApi.quizProcessLeaning(quizId, quizData)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-history', 5] }),
                queryClient.refetchQueries({ queryKey: ['course-my-bought'] })
            ])
        }
    })
}

export const useCheckQuizLeaning = () => {
    return useMutation<any, Error, [ICheckQuizLeaningPost]>({
        mutationFn: async ([quizData]) => {
            return lessonApi.checkQuizLeaning(quizData)
        }
    })
}

export const useGetQuizLeaning = (
    idUser: number,
    idQuiz: number,
    checkQuiz: boolean | undefined,
    options?: Omit<UseQueryOptions<ICheckQuizLeaningPost>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICheckQuizLeaningPost>({
        ...options,
        queryKey: ['lesson-get-quiz', idQuiz],
        enabled: !!checkQuiz && checkQuiz == true,
        queryFn: () => lessonApi.getQuizLeaning(idUser, idQuiz)
    })
}
