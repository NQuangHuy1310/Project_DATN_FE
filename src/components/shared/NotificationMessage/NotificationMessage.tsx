
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { INotificationMessage } from "@/types/notificationmessage"


const NotificationMessage = ({ isRead, title, time, description }: INotificationMessage) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 py-5">

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                    <p className="font-medium">{title}</p>
                    <small className="text-gray-400">{description}</small>
                </div>
            </div>
            <div>
                <span className="text-gray-400 font-medium">{time} phút trước</span>
                <div className="flex justify-end mt-2">{isRead ? <span></span> : <span className="block w-2 h-2 bg-red-600 rounded-full"></span>}</div>
            </div>
        </div>
    )
}

export default NotificationMessage
