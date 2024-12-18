import { useEffect, useRef, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { IUserData } from '@/types'
import { getImagesUrl } from '@/lib'
import { useSendMessage } from '@/app/hooks/chats'
import { IConversationById } from '@/types/chats'

interface IMessageProps {
    receiverId?: string | null
    messageData: IConversationById
    userData: IUserData | undefined
}

const Message = ({ messageData, receiverId }: IMessageProps) => {
    const { mutateAsync: sendMessage } = useSendMessage()
    const [message, setMessage] = useState('')
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const handleSubmit = async () => {
        const payload = {
            message: message,
            receiver_id: receiverId ? Number(receiverId) : messageData.receiver_id
        }

        await sendMessage(payload)
        setMessage('')
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messageData.messages])

    return (
        <div className="h-full w-full flex-col gap-4">
            <div className="flex flex-shrink-0 items-center border-b">
                <div className="flex items-center gap-x-4 p-4">
                    <Avatar className="size-9 cursor-pointer">
                        <AvatarImage
                            className="object-cover"
                            src={getImagesUrl(messageData.receiver_avatar || '')}
                            alt={messageData.receiver_name}
                        />
                        <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                            {messageData.receiver_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">{messageData.receiver_name}</p>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex h-[620px] flex-col p-4" ref={scrollRef}>
                {messageData.messages
                    .slice()
                    .reverse()
                    .map((message, index) => {
                        const isSender = messageData.receiver_id === message.sender.id

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'flex',
                                    isSender ? 'my-2 justify-start gap-x-3' : 'my-2 justify-end gap-x-3'
                                )}
                            >
                                {isSender && (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-9 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(messageData.receiver_avatar || '')}
                                                alt={messageData.receiver_name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {messageData.receiver_name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-4">
                                            <p className="rounded-lg bg-neutral-200 p-3 text-xs">{message.content}</p>
                                        </div>
                                    </div>
                                )}

                                {!isSender && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col gap-4">
                                            <p className="rounded-lg bg-primary p-3 text-xs text-white">
                                                {message.content}
                                            </p>
                                        </div>
                                        <Avatar className="size-9 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(message.sender.avatar || '')}
                                                alt={message.sender.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {message.sender.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                )}
                            </div>
                        )
                    })}
            </ScrollArea>

            <div className="flex flex-shrink-0 items-center gap-2 border-t p-4">
                <Textarea
                    autoFocus
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleSendMessage}
                    className="w-full rounded-md border p-2"
                    placeholder={`Nhập tin nhắn tới ${messageData.receiver_name}`}
                />
                <Button className="h-full rounded-md bg-blue-500 px-3 py-2 text-white" onClick={handleSubmit}>
                    <RiSendPlaneFill className="size-5" />
                </Button>
            </div>
        </div>
    )
}

export default Message
