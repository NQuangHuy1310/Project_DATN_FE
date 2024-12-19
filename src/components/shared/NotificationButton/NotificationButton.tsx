import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { vi } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import logo from '@/assets/Union.svg'
import { FaRegBell } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { TiDelete } from 'react-icons/ti'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    useDeleteNotification,
    useGetAllAndUnRead,
    useGetNotification,
    useMarkAsRead
} from '@/app/hooks/notifications/notifications'
import echo from '@/configs/echo'
import routes from '@/configs/routes'
import { useUserStore } from '@/app/store'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useQueryClient } from '@tanstack/react-query'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const NotificationButton = () => {
    const { user } = useGetUserProfile()
    const queryClient = useQueryClient()
    // Lấy tất cả thông báo
    const { data: dataNotification } = useGetNotification(10)

    const dataNotificationTeacher = dataNotification?.filter((data) => data?.data?.user_role === 'instructor')
    const dataNotificationMember = dataNotification?.filter((data) => data?.data?.user_role === 'member')

    // Lấy số lượng thông báo chưa đọc
    const { data: countUnread } = useGetAllAndUnRead()

    // Đọc thông báo
    const { mutateAsync: readNotification } = useMarkAsRead()
    // Xóa thông báo
    const { mutateAsync: deleteNotification } = useDeleteNotification()

    // Hàm định dạng thời gian thông báo
    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }

    const users = useUserStore((state) => state.user)

    useEffect(() => {
        if (!users?.id) return
        const channel = echo.private(`App.Models.User.${users.id}`)

        channel.notification(async (data: any) => {
            if (data) {
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: ['notifications', 10],
                        exact: true
                    }),
                    queryClient.invalidateQueries({
                        queryKey: ['getAllAndUnRead'],
                        exact: true
                    })
                ])
            }
        })

        return () => {
            echo.leaveChannel(`App.Models.User.${users?.id}`)
        }
    }, [])

    const handleDeleteNotification = async (id: string) => {
        await deleteNotification(id)
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
                    <DropdownMenuGroup className="scrollbar-hide max-h-[500px] overflow-y-auto">
                        {user?.user_type == 'teacher' && (
                            <Tabs defaultValue="member" className="flex flex-col">
                                <TabsList className="flex w-full items-start justify-start">
                                    <TabsTrigger value="member" className="max-w-1/2 px-4 py-2">
                                        Học viên
                                    </TabsTrigger>
                                    <TabsTrigger value="teacher" className="max-w-1/2 relative px-4 py-2">
                                        Giảng viên
                                    </TabsTrigger>
                                </TabsList>
                                <div className="p-4">
                                    <TabsContent value="member" className="flex flex-col gap-2">
                                        {dataNotificationMember && dataNotificationMember?.length > 0 ? (
                                            dataNotificationMember?.map((item, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    className={`group relative w-full rounded-lg ${!item.read_at && 'bg-primary/10'}`}
                                                >
                                                    <Link
                                                        to={item.data.url}
                                                        className={`flex w-full items-center justify-between gap-3`}
                                                        onClick={() => handleReadNotification(item.id)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={logo}
                                                                alt="Coursea"
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                            <div className="flex flex-col gap-0.5">
                                                                {item.data.message}
                                                                <p className="text-xs text-primary">
                                                                    {formatTime(item.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {!item.read_at && <GoDotFill className="size-4 text-primary" />}
                                                    </Link>
                                                    <TiDelete
                                                        onClick={() => handleDeleteNotification(item.id)}
                                                        className="absolute -right-2.5 top-1/2 hidden size-5 -translate-y-1/2 text-red-500 group-hover:block"
                                                    />
                                                </DropdownMenuItem>
                                            ))
                                        ) : (
                                            <span className="text-primary">Không có thông báo</span>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="teacher" className="flex flex-col gap-2">
                                        {dataNotificationTeacher && dataNotificationTeacher?.length > 0 ? (
                                            dataNotificationTeacher?.map((item, index) => (
                                                <DropdownMenuItem
                                                    key={index}
                                                    className={`group relative w-full rounded-lg ${!item.read_at && 'bg-primary/10'}`}
                                                >
                                                    <Link
                                                        to={item.data.url}
                                                        className={`flex w-full items-center justify-between gap-3`}
                                                        onClick={() => handleReadNotification(item.id)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={logo}
                                                                alt="Coursea"
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                            <div className="flex flex-col gap-0.5">
                                                                {item.data.message}
                                                                <p className="text-xs text-primary">
                                                                    {formatTime(item.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {!item.read_at && <GoDotFill className="size-4 text-primary" />}
                                                    </Link>
                                                    <TiDelete
                                                        onClick={() => handleDeleteNotification(item.id)}
                                                        className="absolute -right-2.5 top-1/2 hidden size-5 -translate-y-1/2 text-red-500 group-hover:block"
                                                    />
                                                </DropdownMenuItem>
                                            ))
                                        ) : (
                                            <span className="text-primary">Không có thông báo</span>
                                        )}
                                    </TabsContent>
                                </div>
                            </Tabs>
                        )}
                        {user?.user_type == 'member' && (
                            <div className="flex flex-col gap-2">
                                {dataNotificationMember && dataNotificationMember?.length > 0 ? (
                                    dataNotificationMember?.map((item, index) => (
                                        <DropdownMenuItem
                                            key={index}
                                            className={`group relative w-full rounded-lg ${!item.read_at && 'bg-primary/10'}`}
                                        >
                                            <Link
                                                to={item.data.url}
                                                className={`flex w-full items-center justify-between gap-3`}
                                                onClick={() => handleReadNotification(item.id)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={logo}
                                                        alt="Coursea"
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex flex-col gap-0.5">
                                                        {item.data.message}
                                                        <p className="text-xs text-primary">
                                                            {formatTime(item.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                                {!item.read_at && <GoDotFill className="size-4 text-primary" />}
                                            </Link>
                                            <TiDelete
                                                onClick={() => handleDeleteNotification(item.id)}
                                                className="absolute -right-2.5 top-1/2 hidden size-5 -translate-y-1/2 text-red-500 group-hover:block"
                                            />
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <span className="block px-2 py-4 text-primary">Không có thông báo</span>
                                )}
                            </div>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default NotificationButton
