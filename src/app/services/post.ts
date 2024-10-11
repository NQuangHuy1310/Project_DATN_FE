import axiosClient from '@/configs/axiosClient'
import { IPosts } from '@/types/posts'
import { postUri } from './Uri/post'

export const postsApi = {
    getAllPost: async (): Promise<IPosts[]> => {
        return axiosClient.get(postUri.ALL_POST)
    }
}
