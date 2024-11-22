import { postUri } from '@/app/services/Uri/posts'
import axiosClient from '@/configs/axiosClient'
import { IComment, ICreateComment } from '@/types'

import { ICreatePost, IFeaturedPost, IListPost, IPostDetail, IPosts, ISavedPosts } from '@/types/post'

export const postsApi = {
    getAllPost: async (page: number, perPage?: number): Promise<IListPost> => {
        return axiosClient.get(postUri.POST(page, perPage))
    },

    createPost: async (postData: ICreatePost): Promise<any> => {
        return axiosClient.post(postUri.ADD_POST, postData)
    },

    updatePost: async (postSlug: string, postData: ICreatePost): Promise<any> => {
        return axiosClient.post(postUri.UPDATE_POST(postSlug), postData)
    },

    getPostDetail: async (postSlug: string): Promise<IPostDetail> => {
        return axiosClient.get(postUri.GET_POST_DETAIL(postSlug))
    },

    myPost: async (): Promise<IPosts[]> => {
        return axiosClient.get(postUri.MY_POST)
    },

    getPostByUserId: async (userId: string) => {
        return axiosClient.get(postUri.GET_POST_BY_USER_ID(userId))
    },

    deletePost: async (postSlug: string) => {
        return axiosClient.delete(postUri.DELETE_POST(postSlug))
    },

    getComment: async (postSlug: string): Promise<IComment[]> => {
        return axiosClient.get(postUri.COMMENT(postSlug))
    },

    addComment: async (commentData: ICreateComment): Promise<ICreateComment> => {
        return axiosClient.post(postUri.ADD_COMMENT, commentData)
    },

    getFeaturedPost: async (): Promise<IFeaturedPost[]> => {
        return axiosClient.get(postUri.FEATURED_POST)
    },

    savePost: async (slug: string): Promise<any> => {
        return axiosClient.post(postUri.SAVE_POST(slug))
    },

    unSavePost: async (slug: string): Promise<any> => {
        return axiosClient.post(postUri.UN_SAVE_POST(slug))
    },

    checkSavedPost: async (slug: string): Promise<any> => {
        return axiosClient.get(postUri.CHECK_SAVE_POST(slug))
    },

    likePost: async (slug: string): Promise<any> => {
        return axiosClient.post(postUri.LIKE_POST(slug))
    },

    unLikePost: async (slug: string): Promise<any> => {
        return axiosClient.post(postUri.UNLIKE_POST(slug))
    },

    checkLikedPost: async (slug: string): Promise<any> => {
        return axiosClient.get(postUri.CHECK_LIKED_POST(slug))
    },

    getPostByCategory: async (slug: string): Promise<any> => {
        return axiosClient.get(postUri.GET_POST_BY_CATEGORY(slug))
    },

    getPostSaved: async (page: number, perPage?: number): Promise<ISavedPosts> => {
        return axiosClient.get(postUri.GET_POST_SAVED(page, perPage))
    }
}
