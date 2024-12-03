import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { postsApi } from '@/app/services/posts'
import {
    ICheckLikePost,
    ICheckSavePost,
    ICreatePost,
    IFeaturedPost,
    IListPost,
    IPostDetail,
    IPosts,
    IPostsCategory,
    ISavedPosts
} from '@/types/post'
import { IComment, ICreateComment } from '@/types'

export const useGetPosts = (
    page: number,
    perPage?: number,
    search?: string,
    options?: Omit<UseQueryOptions<IListPost>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IListPost>({
        ...options,
        queryKey: ['posts', page, perPage, search],
        queryFn: () => postsApi.getAllPost(page, perPage, search)
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

export const useGetPost = (slug: string, options?: Omit<UseQueryOptions<IPostDetail>, 'queryKey' | 'queryFn'>) => {
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
        queryKey: ['comments-post', slug],
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

export const useSavePosts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (slug: string) => {
            return postsApi.savePost(slug)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.refetchQueries({ queryKey: ['saved-post'] }),
                queryClient.invalidateQueries({ queryKey: ['check-saved-post'] })
            ])
        }
    })
}

export const useUnSavePosts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (slug: string) => {
            return postsApi.unSavePost(slug)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['saved-post'] }),
                queryClient.invalidateQueries({ queryKey: ['check-saved-post'] })
            ])
        }
    })
}

export const useCheckSavedPost = (
    slug: string,
    options?: Omit<UseQueryOptions<ICheckSavePost>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICheckSavePost>({
        ...options,
        queryKey: ['check-saved-post', slug],
        enabled: !!slug,
        queryFn: () => postsApi.checkSavedPost(slug)
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (slug: string) => {
            return postsApi.likePost(slug)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['post'] }),
                queryClient.invalidateQueries({ queryKey: ['liked-post'] })
            ])
        }
    })
}

export const useUnLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (slug: string) => {
            return postsApi.unLikePost(slug)
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['post'] }),
                queryClient.invalidateQueries({ queryKey: ['liked-post'] })
            ])
        }
    })
}

export const useCheckLikedPost = (
    slug: string,
    options?: Omit<UseQueryOptions<ICheckLikePost>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ICheckLikePost>({
        ...options,
        queryKey: ['liked-post', slug],
        enabled: !!slug,
        queryFn: () => postsApi.checkLikedPost(slug)
    })
}

export const useGetPostsByCategory = (
    slug: string,
    options?: Omit<UseQueryOptions<IPostsCategory>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        enabled: !!slug,
        queryKey: ['post-by-category', slug],
        queryFn: () => postsApi.getPostByCategory(slug)
    })
}

export const useGetPostsSaved = (
    page: number,
    perPage?: number,
    options?: Omit<UseQueryOptions<ISavedPosts>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        ...options,
        queryKey: ['saved-post', page, perPage],
        queryFn: () => postsApi.getPostSaved(page, perPage)
    })
}
