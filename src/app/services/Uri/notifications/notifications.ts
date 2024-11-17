const NOTIFICATION_URL = 'user/notifications/'

export const notificationUri = {
    getNotifications: (count?: number) => `${NOTIFICATION_URL}?counts=${count}`,
    getAllAndUnRead: `${NOTIFICATION_URL}all-and-unread`,
    markAdRead: (id: string) => `${NOTIFICATION_URL}${id}/mark-as-read`,
    deleteNotification: (id: number) => `${NOTIFICATION_URL}${id}/delete`
}
