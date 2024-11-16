import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'

import { Notification } from '@/types'
import { useMarkAsRead } from '@/app/hooks/notifications'
import { HiBookOpen } from 'react-icons/hi'
import { GoDotFill } from 'react-icons/go'
import { Link } from 'react-router-dom'

const NotificationMessage = ({ id, data, read_at, created_at }: Notification) => {
    // Đọc thông báo
    const { mutateAsync: readNotification } = useMarkAsRead()

    const handleReadNotification = async (id: string) => {
        await readNotification(id)
    }

    // Hàm định dạng thời gian thông báo
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }

    return (
        <Link
            to={data.url}
            onClick={() => handleReadNotification(id)}
            className={`flex items-center justify-between rounded-lg px-5 py-3 ${!read_at && 'bg-softGrey'} cursor-pointer hover:bg-softGrey hover:transition-all`}
        >
            <div className="flex items-center gap-7">
                {data.type == 'course_approved' && <HiBookOpen className="size-6 text-primary" />}
                <div className="flex flex-col gap-1">
                    <h5 className="text-base text-black">{data.course_name}</h5>
                    <p className="text-sm text-darkGrey">{data.message}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <p className="text-sm text-darkGrey">{formatTime(created_at)}</p>
                {!read_at && <GoDotFill className="size-4 text-primary" />}
            </div>
        </Link>
    )
}

export default NotificationMessage
