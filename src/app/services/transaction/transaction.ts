import axiosClient from '@/configs/axiosClient.ts'
import { transactionInstructorUri } from '@/app/services/Uri/transaction'
import { IRequestWithDrawData, ITeacherBalance } from '@/types/transaction.ts'

export const transactionApi = {
    getBalance: async (userId: number): Promise<ITeacherBalance> => {
        return axiosClient.get(transactionInstructorUri.GET_BALANCE(userId))
    },
    requestWithdraw: async (userId: number, data: IRequestWithDrawData): Promise<any> => {
        return axiosClient.post(transactionInstructorUri.REQUEST_WITHDRAW(userId), data)
    },
    getHistoryWithDraw: async (userId: number, page: number, perPage?: number): Promise<any> => {
        return axiosClient.get(transactionInstructorUri.HISTORY_WITHDRAW(userId, page, perPage))
    }
}
