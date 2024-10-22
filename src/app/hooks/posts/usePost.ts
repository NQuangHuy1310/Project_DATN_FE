import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { postsApi } from '@/app/services/posts'
import { ICreatePost, IPosts } from '@/types/post'

export const usePost = (options?: Omit<UseQueryOptions<IPosts[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IPosts[]>({
        ...options,
        queryKey: ['posts'],
        queryFn: postsApi.getAllPost
    })
}

export const useCreatePost = () => {
    return useMutation({
        mutationFn: (data: ICreatePost) => postsApi.createPost(data)
    })
}
