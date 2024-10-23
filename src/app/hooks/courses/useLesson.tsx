import { lessonApi } from '@/app/services/courses/lessons'
import { ILessonLeaning, ILessonProCess } from '@/types/course/course'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useLessonById = (id: number, options?: Omit<UseQueryOptions<ILessonLeaning>, 'queryKey' | 'queryFn'>) => {
    return useQuery<ILessonLeaning>({
        ...options,
        queryKey: ['lesson', id],
        enabled: !!id,
        queryFn: () => lessonApi.detailLessonLeaning(id)
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
