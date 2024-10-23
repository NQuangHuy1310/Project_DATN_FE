import axiosClient from '@/configs/axiosClient'
import { userUri } from '../Uri/accounts'
import { ITransaction } from '@/types/transaction'
import axios from 'axios'

export const transactionsApi = {
    getBalance: async (userId: number): Promise<any> => {
        return axiosClient.get(userUri.GET_BALANCE(userId))
    },

    addPayment: async (userId: number, paymentData: ITransaction): Promise<any> => {
        const token = localStorage.getItem('access_token')
        return axios.post(`http://localhost:8000/api/transactions/payment/${userId}`, paymentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}
