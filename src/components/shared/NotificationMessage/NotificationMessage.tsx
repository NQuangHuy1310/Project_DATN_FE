import { vi } from 'date-fns/locale'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

import { TiDelete } from 'react-icons/ti'
import { GoDotFill } from 'react-icons/go'
import { HiBookOpen } from 'react-icons/hi'
import { Notification } from '@/types'
import { useDeleteNotification, useMarkAsRead } from '@/app/hooks/notifications'

const NotificationMessage = ({ id, data, read_at, created_at }: Notification) => {
    // Đọc thông báo
    const { mutateAsync: readNotification } = useMarkAsRead()
    // Xóa thông báo
    const { mutateAsync: deleteNotification } = useDeleteNotification()

    const handleReadNotification = async (id: string) => {
        await readNotification(id)
    }

    // Hàm định dạng thời gian thông báo
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }

    const handleDeleteNotification = async (id: string) => {
        await deleteNotification(id)
        toast.success('Xóa thông báo thành công')
    }

    return (
        <div className="group relative">
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
            <TiDelete
                onClick={() => handleDeleteNotification(id)}
                className="absolute -right-4 top-1/2 z-50 hidden size-8 -translate-y-1/2 cursor-pointer text-red-500 group-hover:block"
            />
        </div>
    )
}

export default NotificationMessage
