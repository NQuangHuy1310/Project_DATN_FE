import axiosClient from '@/configs/axiosClient'
import { bannerUri } from '../Uri/others/banners'
import { IBanner } from '@/types/banner'

export const bannerApi = {
    getBanners: async (): Promise<IBanner[]> => {
        return axiosClient.get(bannerUri.BANNER)
    }
}
