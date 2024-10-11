import { postUri } from '@/app/services/Uri/posts'
import axiosClient from '@/configs/axiosClient'
import { IPosts } from '@/types/posts'

export const postsApi = {
    getAllPost: async (): Promise<IPosts[]> => {
        return axiosClient.get(postUri.ALL_POST)
    }
}
