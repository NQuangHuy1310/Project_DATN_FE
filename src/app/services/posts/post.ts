import { postUri } from '@/app/services/Uri/posts'
import axiosClient from '@/configs/axiosClient'
import { ICreatePost, IPosts } from '@/types/post'

export const postsApi = {
    getAllPost: async (): Promise<IPosts[]> => {
        return axiosClient.get(postUri.POST)
    },
    createPost: async (postData: ICreatePost): Promise<any> => {
        return axiosClient.post(postUri.POST, postData)
    },
    updatePost: async () => {},
    getPostDetail: async () => {},
    myPost: async () => {},
    getPostByUserId: async () => {},
    deletePost: async () => {}
}
