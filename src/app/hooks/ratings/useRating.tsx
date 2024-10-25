import { ratingsApi } from '@/app/services/ratings/rating'
import { IRating } from '@/types/rating'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useGetRatingHome = (options?: Omit<UseQueryOptions<IRating[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IRating[]>({
        ...options,
        queryKey: ['rating-home'],
        queryFn: () => ratingsApi.getRatingHome()
    })
}
