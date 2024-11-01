import axiosClient from '@/configs/axiosClient'
import { userUri } from '../Uri/accounts'
import { IHistory, ITransaction } from '@/types/transaction'
import axios from 'axios'
import { transactionUri } from '../Uri/transaction'
import { backendUrl } from '@/configs/baseUrl'

export const transactionsApi = {
    getBalance: async (userId: number): Promise<any> => {
        return axiosClient.get(userUri.GET_BALANCE(userId))
    },

    addPayment: async (userId: number, paymentData: ITransaction): Promise<any> => {
        const token = localStorage.getItem('access_token')
        return axios.post(`${backendUrl}transactions/payment/${userId}`, paymentData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getHistory: async (userId: number): Promise<IHistory[]> => {
        return axiosClient.get(transactionUri.GET_HISTORY(userId))
    }
}
