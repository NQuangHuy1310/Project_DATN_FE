import { notificationUri } from '@/app/services/Uri/notifications'
import axiosClient from '@/configs/axiosClient.ts'
import { Notification } from '@/types'

export const notificationApi = {
    getNotifications: async (count?: number): Promise<Notification[]> => {
        return axiosClient.get(notificationUri.getNotifications(count))
    },
    getAllAndUnRead: async (): Promise<any> => {
        return axiosClient.get(notificationUri.getAllAndUnRead)
    },
    markAsRead: async (id: string): Promise<any> => {
        return axiosClient.post(notificationUri.markAdRead(id), {})
    },
    deleteNotification: async (id: string): Promise<any> => {
        return axiosClient.delete(notificationUri.deleteNotification(id))
    }
}
