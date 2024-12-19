import { toast } from 'sonner'
import { lessonApi } from '@/app/services/courses/lessons'
import {
    ICheckQuizLeaningPost,
    ILesson,
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

export const useUpdateLessonProCess = (slug: string) => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonProCess]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return lessonApi.lessonProcessLeaning(lessonId, lessonData)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-history', 5] }),
                queryClient.refetchQueries({ queryKey: ['course-my-bought'] }),
                queryClient.refetchQueries({ queryKey: ['course-leaning', slug] })
            ])
        }
    })
}

export const useUpdateQuizProCess = (slug: string) => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, IQuizProCess]>({
        mutationFn: async ([quizId, quizData]) => {
            return lessonApi.quizProcessLeaning(quizId, quizData)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['course-history', 5] }),
                queryClient.refetchQueries({ queryKey: ['course-my-bought'] }),
                queryClient.refetchQueries({ queryKey: ['course-leaning', slug] })
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

export const useCheckCodeLeaning = (id: number, slug: string) => {
    const { mutateAsync: updateProcess } = useUpdateLessonProCess(slug)
    return useMutation<any, Error, [number, string]>({
        mutationFn: async ([idCode, output]) => {
            return lessonApi.checkCodeLeaning(idCode, output)
        },
        onSuccess: async () => {
            toast.success('Chúc mừng bạn đã hoàn thành bài làm.')
            try {
                await updateProcess([
                    id,
                    {
                        is_completed: 1,
                        last_time_video: null,
                        _method: 'PUT'
                    }
                ])
            } catch (error) {
                toast.error('Đã xảy ra lỗi khi cập nhật trạng thái bài học.')
            }
        }
    })
}
export const useLessonPreview = (id: number, options?: Omit<UseQueryOptions<ILesson>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ILesson>({
        ...options,
        queryKey: ['lesson-preview', id],
        enabled: !!id,
        queryFn: () => lessonApi.lessonPreview(id)
    })
}