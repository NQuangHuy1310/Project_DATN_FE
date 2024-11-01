import axios from 'axios'
import { IRating, IRatingCreate } from '@/types/course/rating'
import axiosClient from '@/configs/axiosClient'
import { ratingUri } from '../Uri/ratings/rating'
import { backendUrl } from '@/configs/baseUrl'

export const ratingsApi = {
    getRatingHome: async (): Promise<any> => {
        return axiosClient.get(ratingUri.GET_RATING_HOME())
    },
    getRatingForCourse: async (id: number): Promise<IRating[]> => {
        return axiosClient.get(ratingUri.GET_RATING_FOR_COURSE(id))
    },
    addRatingCourse: async (ratingData: IRatingCreate): Promise<IRatingCreate> => {
        return axiosClient.post(ratingUri.ADD_RATING, ratingData)
    },
    checkRatingUser: async (userId: number, courseId: number): Promise<any> => {
        const token = localStorage.getItem('access_token')
        return axios.get(`${backendUrl}ratings/check-rating-course/${userId}/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    checkRated: async (userId: number, courseId: number): Promise<any> => {
        const token = localStorage.getItem('access_token')
        return axios.get(`${backendUrl}ratings/check-rated/${userId}/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
