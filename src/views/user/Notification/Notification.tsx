import NotifyMessage from "@/components/shared/NotifyMessage"
import { notifyMessages } from "@/constants/mockData"



const Notification = () => {
    return (
        <div className="w-full  flex-col gap-7 rounded-xl bg-white p-7">
            <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl">Thông báo</h3>
                <span className="text-gray-500">Đánh dấu đã đọc</span>
            </div>
            <div>

                {notifyMessages && notifyMessages.length > 0 && notifyMessages.map((item, index) => (
                    <div>
                        <NotifyMessage key={index} title={item.title} avatar={item.avatar} message={item.message} status={item.status} time={item.time} read={item.read} />
                        <div className="w-full h-[1px] bg-grey"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification