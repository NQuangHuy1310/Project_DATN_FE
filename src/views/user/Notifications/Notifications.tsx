import { notificationMessages } from '@/constants/mockData'
import NotificationMessage from '@/components/shared/NotificationMessage'

const Notifications = () => {
    return (
        <div className="card w-full">
            <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold">Thông báo</h4>
                    <p className="cursor-pointer text-darkGrey">Đánh dấu đã đọc</p>
                </div>
                <div className="flex flex-col gap-3">
                    {notificationMessages &&
                        notificationMessages.length > 0 &&
                        notificationMessages.map((item, index) => <NotificationMessage key={index} {...item} />)}
                </div>
            </div>
        </div>
    )
}

export default Notifications
