import { INotifyMessage } from "@/types/notifymessage"
import { FaBookOpen } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { MdMarkEmailUnread } from "react-icons/md"
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"

const NotifyMessage = ({ read, title, status, message, time, avatar }: INotifyMessage) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-5 py-5">
                <div className="">
                    {status === 'message' &&
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/id/237/250" alt="@shadcn" />
                        </Avatar>}
                    {status === 'myCourse' && <div className="bg-primary  p-2 rounded-full"><FaBookOpen className=" size-5 text-white" /></div>}
                    {status === 'newCourse' && <div className="bg-primary  p-2 rounded-full"><MdMarkEmailUnread className="size-5 text-white" /></div>}
                    {status === 'notify' && <div className="bg-primary  p-2 rounded-full"><IoMdSettings className="size-5 text-white" /></div>}
                </div>
                <div>
                    <p className="font-medium">{title}</p>
                    <small className="text-gray-400">{message}</small>
                </div>
            </div>
            <div>
                <span className="text-gray-400 ">{time}</span>
                <div className="flex justify-end mt-3">{read ? <span></span> : <span className="block w-2 h-2 bg-red-600 rounded-full"></span>}</div>
            </div>
        </div>
    )
}

export default NotifyMessage