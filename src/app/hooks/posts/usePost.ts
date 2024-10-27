import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import { postsApi } from '@/app/services/posts'
import { ICommentPost, ICreateCommentPost, ICreatePost, IPosts } from '@/types/post'

export const useGetPosts = (options?: Omit<UseQueryOptions<IPosts[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery<IPosts[]>({
        ...options,
        queryKey: ['posts'],
        queryFn: postsApi.getAllPost
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ICreatePost) => {
            return postsApi.createPost(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] })
        }
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()

    return useMutation<any, Error, [string, ICreatePost]>({
        mutationFn: async ([postSlug, moduleData]) => {
            return postsApi.updatePost(postSlug, moduleData)
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] })
        }
    })
}

export const useGetPost = (slug: string, options?: Omit<UseQueryOptions<IPosts>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        enabled: !!slug,
        queryKey: ['post', slug],
        queryFn: () => postsApi.getPostDetail(slug)
    })
}

export const useGetMyPosts = (options?: Omit<UseQueryOptions<IPosts[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['myPosts'],
        queryFn: postsApi.myPost
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (slug: string) => {
            return postsApi.deletePost(slug)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myPosts'] })
        }
    })
}
export const useGetComment = (
    slug: string,
    options?: Omit<UseQueryOptions<ICommentPost[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['comments'],
        queryFn: () => postsApi.getComment(slug)
    })
}
export const useAddComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: ICreateCommentPost) => {
            return postsApi.addComment(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })
}
