import { notificationUri } from '@/app/services/Uri/notifications'
import axiosClient from '@/configs/axiosClient.ts'

export const notificationApi = {
    getNotifications: async (count?: number): Promise<any> => {
        return axiosClient.get(notificationUri.getNotifications(count))
    },
    getAllAndUnRead: async (): Promise<any> => {
        return axiosClient.get(notificationUri.getAllAndUnRead)
    },
    markAsRead: async (id: number): Promise<any> => {
        return axiosClient.post(notificationUri.markAdRead(id), {})
    },
    deleteNotification: async (id: number): Promise<any> => {
        return axiosClient.delete(notificationUri.deleteNotification(id))
    }
}
