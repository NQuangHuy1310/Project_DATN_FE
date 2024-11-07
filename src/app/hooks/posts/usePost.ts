import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import { postsApi } from '@/app/services/posts'
import { ICreatePost, IFeaturedPost, IPosts } from '@/types/post'
import { IComment, ICreateComment } from '@/types'


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
export const useGetCommentPost = (
    slug: string,
    options?: Omit<UseQueryOptions<IComment[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['comments-post'],
        queryFn: () => postsApi.getComment(slug)
    })
}

export const useAddCommentPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: ICreateComment) => {
            return postsApi.addComment(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments-post'] })
        }
    })
}

export const useGetFeaturedPosts = (options?: Omit<UseQueryOptions<IFeaturedPost[]>, 'queryKey' | 'queryFn'>) => {
    return useQuery({
        ...options,
        queryKey: ['featuredPosts'],
        queryFn: postsApi.getFeaturedPost
    })
}