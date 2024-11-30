import { ratingsApi } from '@/app/services/ratings/rating'
import { IRating, IRatingCreate } from '@/types/course/rating'
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

export const useGetRatingHome = (options?: Omit<UseQueryOptions<IRating[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IRating[]>({
        ...options,
        queryKey: ['rating-home'],
        queryFn: () => ratingsApi.getRatingHome()
    })
}

export const useGetRatingForCourse = (
    id: number,
    options?: Omit<UseQueryOptions<IRating[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IRating[]>({
        ...options,
        enabled: !!id,
        queryKey: ['ratings', id],
        queryFn: () => ratingsApi.getRatingForCourse(id)
    })
}

export const useCreateRating = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: IRatingCreate) => {
            return ratingsApi.addRatingCourse(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['course-detail'] })
            queryClient.invalidateQueries({ queryKey: ['rating-check'] })
        }
    })
}
