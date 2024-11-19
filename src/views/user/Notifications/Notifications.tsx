import NotificationMessage from '@/components/shared/NotificationMessage'
import { useGetAllAndUnRead, useGetNotification } from '@/app/hooks/notifications/notifications'
import NoContent from '@/components/shared/NoContent/NoContent'

const Notifications = () => {
    const { data: totalNotification } = useGetAllAndUnRead()
    const { data: dataNotification } = useGetNotification(totalNotification?.allNotifications!)

    return (
        <div className="card w-full">
            <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold">Thông báo</h4>
                    <p className="cursor-pointer text-darkGrey">Đánh dấu đã đọc</p>
                </div>
                <div className="flex flex-col gap-3">
                    {dataNotification && dataNotification.length > 0 ? (
                        dataNotification?.map((item, index) => <NotificationMessage key={index} {...item} />)
                    ) : (
                        <NoContent />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notifications
