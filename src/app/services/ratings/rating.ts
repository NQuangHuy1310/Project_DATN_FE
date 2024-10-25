import { ratingUri } from './../Uri/ratings/rating'
import axiosClient from '@/configs/axiosClient'

export const ratingsApi = {
    getRatingHome: async (): Promise<any> => {
        return axiosClient.get(ratingUri.GET_RATING_HOME())
    }
}
