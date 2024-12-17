import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Message from '@/components/shared/Message/Message'
import { accountMessages, messages } from '@/constants/mockData'

const CommunicateMessage = () => {
    const [togglePage, setTogglePage] = useState<boolean>(false)

    const [receiverId, setReceiverId] = useState<string | null>(null)

    const handleToggle = () => setTogglePage((prev) => !prev)

    const renderMessageTime = (time: number) => {
        if (time < 60) return `${time} phút trước`
        if (time < 120) return '1 giờ trước'
        return `${Math.floor(time / 60)} giờ trước`
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('receiver_to')
        setReceiverId(id)
    }, [])

    return (
        <div className="relative grid h-[850px] grid-cols-12 overflow-y-hidden">
            <div
                className={cn(
                    'scrollbar-hide z-40 col-span-4 h-full w-1/2 transform overflow-y-auto border-r transition-transform',
                    togglePage ? 'translate-x-0' : '-translate-x-full',
                    'md:relative md:col-span-4 md:h-full md:w-full md:translate-x-0'
                )}
            >
                <div className="sticky top-0 w-full border-b bg-white px-1 py-2.5">
                    <div className="flex items-center gap-4">
                        <div className="relative w-[90%]">
                            <Input type="text" className="w-full" placeholder="Tìm kiếm người dùng" />
                            <CiSearch className="absolute right-2 top-1/2 size-5 -translate-y-1/2 transform" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <FaPlus className="size-4 text-primary" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px]" align="end">
                                <DropdownMenuItem>Tạo nhóm chat</DropdownMenuItem>
                                <DropdownMenuItem>Nhắn tin đến</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="h-full bg-white p-2">
                    <div className="flex flex-col gap-2">
                        {accountMessages.map((msg: any, index: number) => (
                            <div
                                key={index}
                                className="flex w-full cursor-pointer items-center space-x-3 border-b py-2"
                            >
                                <img className="h-8 w-8 rounded-full" src={msg.user.avatar} alt={msg.user.name} />
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex w-full items-center justify-between gap-1">
                                        <p className="text-sm font-semibold text-gray-800">{msg.user.name}</p>
                                        <span className="text-[10px] text-gray-500">{renderMessageTime(msg.time)}</span>
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <p className={`line-clamp-2 text-xs ${msg.is_Read ? '' : 'font-bold'}`}>
                                            {msg.message}
                                        </p>
                                        {msg.is_Read ? (
                                            <IoCheckmarkDoneSharp className="size-3 text-primary" />
                                        ) : (
                                            <GoDotFill className="size-3 text-red-600" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={cn('col-span-12 w-full bg-white md:col-span-8', {
                    'hidden md:block': togglePage,
                    block: !togglePage
                })}
            >
                <Message handleToggle={handleToggle} messages={messages} receiverId={receiverId} />
            </div>

            {togglePage && (
                <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={handleToggle} />
            )}
        </div>
    )
}

export default CommunicateMessage
