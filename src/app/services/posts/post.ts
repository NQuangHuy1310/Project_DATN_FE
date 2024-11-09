import { postUri } from '@/app/services/Uri/posts'
import axiosClient from '@/configs/axiosClient'
import { IComment, ICreateComment } from '@/types'

import { ICreatePost, IFeaturedPost, IPosts } from '@/types/post'

export const postsApi = {
    getAllPost: async (): Promise<IPosts[]> => {
        return axiosClient.get(postUri.POST)
    },

    createPost: async (postData: ICreatePost): Promise<any> => {
        return axiosClient.post(postUri.POST, postData)
    },

    updatePost: async (postSlug: string, postData: ICreatePost): Promise<any> => {
        return axiosClient.post(`${postUri.POST}${postSlug}`, postData)
    },

    getPostDetail: async (postSlug: string): Promise<any> => {
        return axiosClient.get(`${postUri.POST}${postSlug}`)
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

    getFeaturedPost:async (): Promise<IFeaturedPost[]> => {
        return axiosClient.get(postUri.FEATURED_POST)
    }
}
