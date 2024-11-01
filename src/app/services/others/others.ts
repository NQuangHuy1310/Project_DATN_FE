import axiosClient from '@/configs/axiosClient'
import { bannerUri } from '../Uri/others/others'

import { IBanner } from '@/types/others'
import axios from 'axios'


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
