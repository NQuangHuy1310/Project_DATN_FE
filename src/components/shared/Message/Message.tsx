import { PiBroomBold } from 'react-icons/pi'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { IUserData } from '@/types'
import { getImagesUrl } from '@/lib'
import { useSendMessage } from '@/app/hooks/chats'
import { IConversationById, IMessage } from '@/types/chats'
import echo from '@/configs/echo'

interface IMessageProps {
    receiverId?: string | null
    messageData?: IConversationById
    userData: IUserData | undefined
}

const Message = ({ messageData, receiverId, userData }: IMessageProps) => {
    const { mutateAsync: sendMessage, isPending } = useSendMessage()

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<IMessage[] | undefined>(undefined)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    const handleSendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') handleSubmit()
    }

    const handleSubmit = async () => {
        if (!message.trim()) return

        const payload = {
            message: message,
            receiver_id: 0
        }

        if (receiverId) {
            payload.receiver_id = Number(receiverId)
        } else {
            payload.receiver_id = messageData ? messageData.receiver_id : 0
        }

        await sendMessage(payload)
        setMessage('')

        setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (messageData) {
            setMessages(messageData?.messages.slice().reverse())
        }
    }, [messageData?.messages, messageData])

    useEffect(() => {
        if (messageData?.conversation_id) {
            const channel = echo.private(`conversation.${messageData?.conversation_id}`)
            channel.listen('MessageSent', async (data: any) => {
                if (data.sender_id !== userData?.id) {
                    setMessages((prev) => [...(prev || []), data])
                }
            })
        }
    }, [messageData?.conversation_id, messageData?.receiver_id, userData?.id])

    return (
        <div className="h-full w-full flex-col gap-4">
            <div className="flex flex-shrink-0 items-center border-b">
                <div className="flex items-center gap-x-4 p-4">
                    {messageData && !receiverId && (
                        <>
                            <Avatar className="size-9 cursor-pointer">
                                <AvatarImage
                                    className="object-cover"
                                    src={getImagesUrl(messageData?.receiver_avatar || '')}
                                    alt={messageData.receiver_name}
                                />
                                <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                    {messageData.receiver_name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold">{messageData.receiver_name}</p>
                            </div>
                        </>
                    )}
                    {userData && (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            <ScrollArea className="flex h-[620px] flex-col p-4">
                {messages &&
                    messageData &&
                    messages.map((message, index) => {
                        const isSender = messageData.receiver_id === message.sender.id
                        const sendTime = new Date(message.created_at).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'flex',
                                    isSender ? 'my-4 justify-start gap-x-3' : 'my-2 justify-end gap-x-3'
                                )}
                            >
                                {isSender && (
                                    <div className="flex items-start gap-2.5">
                                        <Avatar className="size-9 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(messageData?.receiver_avatar || '')}
                                                alt={messageData.receiver_name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {messageData.receiver_name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex w-full max-w-[360px] flex-col gap-1">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {messageData.receiver_name}
                                                </span>
                                                <span className="text-sm font-normal text-gray-500">{sendTime}</span>
                                            </div>
                                            <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4">
                                                <p className="text-sm font-normal text-gray-900">{message.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isSender && (
                                    <div className="flex max-w-[400px] items-start gap-2.5">
                                        <div className="leading-1.5 flex flex-col rounded-s-xl rounded-br-xl bg-primary p-4">
                                            <p className="text-sm font-normal text-white">{message.content}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}{' '}
                <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="flex flex-shrink-0 items-center gap-2 border-t p-4">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleSendMessage}
                    className="w-full resize-none rounded-md border p-2"
                    placeholder={`Nhập tin nhắn tới ${userData ? userData.name : messageData?.receiver_name}`}
                    disabled={isPending}
                    ref={inputRef}
                    style={{ overflowY: 'auto' }}
                    autoFocus
                />
                <div className="flex items-center justify-start gap-2">
                    <Button onClick={() => setMessage('')} variant="outline" className="h-full">
                        <PiBroomBold className="size-5 text-primary" />
                    </Button>
                    <Button onClick={handleSubmit} className="h-full" disabled={!message.trim() || isPending}>
                        <RiSendPlaneFill className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Message
