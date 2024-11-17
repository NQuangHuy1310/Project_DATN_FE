import { Link } from 'react-router-dom'

import { vi } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import logo from '@/assets/Union.svg'
import { FaRegBell } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import routes from '@/configs/routes'
import { useGetAllAndUnRead, useGetNotification, useMarkAsRead } from '@/app/hooks/notifications/notifications'

const NotificationButton = () => {
    // Lấy tất cả thông báo
    const { data: dataNotification } = useGetNotification()

    // Lấy số lượng thông báo chưa đọc
    const { data: countUnread } = useGetAllAndUnRead()

    // Đọc thông báo
    const { mutateAsync: readNotification } = useMarkAsRead()

    // Hàm định dạng thời gian thông báo
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }

    const handleReadNotification = async (id: string) => {
        await readNotification(id)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="relative">
                        <FaRegBell className="size-5 cursor-pointer text-black" />
                        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-600 text-xs leading-4 text-white">
                            {countUnread?.unreadCount}
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96">
                    <DropdownMenuLabel className="flex items-center justify-between">
                        <p className="text-lg">Thông báo</p>
                        <Link to={routes.notification} className="text-sm font-normal">
                            Xem tất cả
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {dataNotification?.map((item, index) => (
                            <DropdownMenuItem
                                key={index}
                                className={`w-full rounded-lg ${!item.read_at && 'bg-primary/10'}`}
                            >
                                <Link
                                    to={item.data.url}
                                    className={`flex w-full items-center justify-between gap-3`}
                                    onClick={() => handleReadNotification(item.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={logo} alt="Coursea" className="h-10 w-10 rounded-full object-cover" />
                                        <div className="flex flex-col gap-0.5">
                                            {item.data.message}
                                            <p className="text-xs text-primary">{formatTime(item.created_at)}</p>
                                        </div>
                                    </div>
                                    {!item.read_at && <GoDotFill className="size-4 text-primary" />}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default NotificationButton
