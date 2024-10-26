import { lessonApi } from '@/app/services/courses/lessons'
import { ILessonLeaning, ILessonProCess } from '@/types/course/course'
import { IQuiz } from '@/types/instructor'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useLessonById = (id: number, options?: Omit<UseQueryOptions<ILessonLeaning>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ILessonLeaning>({
        ...options,
        queryKey: ['lesson-leaning', id],
        enabled: !!id,
        queryFn: () => lessonApi.detailLessonLeaning(id)
    })
}

export const useQuizLessonById = (id: number, options?: Omit<UseQueryOptions<IQuiz>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IQuiz>({
        ...options,
        queryKey: ['lesson-quiz', id],
        enabled: !!id,
        queryFn: () => lessonApi.lessonQuizLeaning(id)
    })
}

export const useUpdateLessonProCess = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [number, ILessonProCess]>({
        mutationFn: async ([lessonId, lessonData]) => {
            return lessonApi.lessonProcess(lessonId, lessonData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['lesson-process'] })
        }
    })
}

export const useCourseData = (idLesson: number | null, isQuiz: boolean = false) => {
    if (idLesson && isQuiz) {
        return useQuizLessonById(idLesson)
    } else if (idLesson && !isQuiz) {
        return useLessonById(idLesson)
    } else {
        return { data: null, isLoading: false, isError: false }
    }
}
