import axiosClient from '@/configs/axiosClient'
import { paymentUri } from '../Uri/payment'
import { IBuyData } from '@/types/payment'

export const paymentApi = {
    getCourseForBuy: async (slug: string): Promise<any> => {
        return axiosClient.get(paymentUri.GET_COURSE(slug))
    },

    buyCourse: async (userId: number, courseId: number, buyData: IBuyData): Promise<any> => {
        return axiosClient.post(paymentUri.BUY_COURSE(userId, courseId), buyData)
    },
    getNewVoucher: async (): Promise<any> => {
        return axiosClient.get(paymentUri.NEW_VOUCHER)
    },
    applyVoucher: async (userId: number, voucher: string): Promise<any> => {
        return axiosClient.get(paymentUri.APPLY_VOUCHER(userId, voucher))
    }
}
