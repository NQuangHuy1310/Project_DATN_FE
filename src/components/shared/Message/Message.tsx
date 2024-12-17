import { useEffect, useRef } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { RiSendPlaneFill } from 'react-icons/ri'

import { cn } from '@/lib/utils'
import { IMessage } from '@/types/communicate'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getImagesUrl } from '@/lib'
import { useGetUserById } from '@/app/hooks/accounts'

interface IMessageProps {
    receiverId: string | null
    messages: IMessage[]
    handleToggle: () => void
}

const Message = ({ messages, handleToggle, receiverId }: IMessageProps) => {
    const { data: userData } = useGetUserById(receiverId ? Number(receiverId) : undefined)

    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const messagesContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const container = messagesContainerRef.current
        if (container && messagesEndRef.current) {
            const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
            if (isAtBottom) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [messages])

    return (
        <div className="flex h-full w-full flex-col justify-between">
            <div className="w-full flex-1" ref={messagesContainerRef}>
                <div className="flex items-center border-b">
                    <HiArrowRight className="mx-4 my-1 size-5 cursor-pointer md:hidden" onClick={handleToggle} />
                    <div className="flex items-center gap-x-4 py-2 md:px-4">
                        <Avatar className="size-9 cursor-pointer">
                            <AvatarImage
                                className="object-cover"
                                src={getImagesUrl(userData?.avatar || '')}
                                alt={userData?.name}
                            />
                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                {userData?.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">{userData?.name}</p>
                        </div>
                    </div>
                </div>

                <div className="flex max-h-[700px] flex-col gap-4 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={cn('flex', msg.fromUser ? 'gap-x-3' : 'justify-end gap-x-3 space-x-reverse')}
                        >
                            {msg.fromUser && <img className="h-8 w-8 rounded-full" src={msg.user.avatar!} alt="" />}
                            <div className="flex flex-col gap-1">
                                <p
                                    className={cn(
                                        'rounded-lg p-3 text-xs',
                                        msg.fromUser ? 'bg-gray-100' : 'bg-blue-500 text-white'
                                    )}
                                >
                                    {msg.text}
                                </p>
                                <span
                                    className={cn(
                                        'flex text-[10px] text-darkGrey',
                                        msg.fromUser ? 'justify-start' : 'justify-end'
                                    )}
                                >
                                    {msg.time}
                                </span>
                            </div>
                            {!msg.fromUser && <img className="h-10 w-10 rounded-full" src={msg.user.avatar!} alt="" />}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="flex items-center gap-2 border-t p-4">
                <Textarea
                    className="w-full rounded-md border p-2"
                    autoFocus
                    placeholder={`Nhập tin nhắn tới ${userData?.name}`}
                    rows={2}
                />
                <div className="">
                    <Button className="h-full rounded-md bg-blue-500 px-3 py-2 text-white">
                        <RiSendPlaneFill className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Message
