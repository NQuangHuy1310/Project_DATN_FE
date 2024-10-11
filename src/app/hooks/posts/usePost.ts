import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { postsApi } from '@/app/services/posts'
import { IPosts } from '@/types/posts'

export const usePost = (options?: Omit<UseQueryOptions<IPosts[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IPosts[]>({
        ...options,
        queryKey: ['posts'],
        queryFn: postsApi.getAllPost,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1
    })
}
