import NotificationMessage from "@/components/shared/NotificationMessage"
import { notificationMessages } from "@/constants/mockData"



const Notification = () => {
    return (
        <div className="w-full  flex-col gap-7 rounded-xl bg-white p-7">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Thông báo</h3>
                <span className="text-gray-500">Đánh dấu đã đọc</span>
            </div>
            <div>

                {notificationMessages && notificationMessages.length > 0 && notificationMessages.map((item, index) => (
                    <div className="cursor-pointer">
                        <NotificationMessage key={index} title={item.title} description={item.description} time={item.time} isRead={item.isRead} />
                        <div className="w-full h-[1px] bg-softGrey"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification

