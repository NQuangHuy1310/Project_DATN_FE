import axiosClient from '@/configs/axiosClient'
import { bannerUri, chatAIUri, learningPathUri } from '../Uri/others/others'

import { IBanner, ICategoryLeaningPath } from '@/types/others'
import axios from 'axios'
import { ICourseLearningPath } from '@/types/course/course'

export const bannerApi = {
    getBanners: async (): Promise<IBanner[]> => {
        return axiosClient.get(bannerUri.BANNER)
    }
}

export const getBanks = async () => {
    return axios
        .get('https://api.vietqr.io/v2/banks')
        .then((res) => res.data)
        .catch((error) => {
            throw error
        })
}

export const learningPathApi = {
    getCateLearningPath: async (): Promise<ICategoryLeaningPath[]> => {
        return axiosClient.get(learningPathUri.LIST_CATE_LEANING_PATH)
    },
    getCourseLearningPath: async (cate: string): Promise<ICourseLearningPath> => {
        return axiosClient.get(learningPathUri.LIST_COURSE_LEANING_PATH(cate))
    }
}

export const communicateChatAI = {
    chatAI: async (question: string) => {
        return axiosClient.post(chatAIUri.CHAT_AI, { question })
    },
    filterChatAI: async (status: string) => {
        return axiosClient.get(chatAIUri.FILTER_CHAT_AI(status))
    }
}
