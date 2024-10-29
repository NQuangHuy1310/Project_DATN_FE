import axiosClient from '@/configs/axiosClient'
import { bannerUri } from '../Uri/others/others'
import { IBanner } from '@/types/banner'

export const bannerApi = {
    getBanners: async (): Promise<IBanner[]> => {
        return axiosClient.get(bannerUri.BANNER)
    }
}
