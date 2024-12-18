import { useState } from 'react'
import { vi } from 'date-fns/locale'
import { FaPlus } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { parse, formatDistanceToNow } from 'date-fns'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

import { useGetUserById } from '@/app/hooks/accounts'
import { useDebounce } from '@/app/hooks/custom/useDebounce'
import { useGetConversationById, useGetConversations, useSearchChat } from '@/app/hooks/chats'

import Message from '@/components/shared/Message/Message'
import { getImagesUrl } from '@/lib'
import { cn } from '@/lib/utils'
import Loading from '@/components/Common/Loading/Loading'

const CommunicateMessage = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const receiverTo = queryParams.get('receiver_to')

    const [conversationId, setConversationId] = useState<number | null>(null)
    const [keySearch, setKeySearch] = useState('')

    const debounce = useDebounce(keySearch, 300)

    const { data: userData } = useGetUserById(Number(receiverTo))
    const { data: conversationsData, isLoading: getConversations } = useGetConversations()
    const { data: conversationData, isLoading: getConversation } = useGetConversationById(
        Number(receiverTo),
        Number(conversationId)
    )
    const { data: searchConversation } = useSearchChat(debounce)

    if (getConversations || getConversation) return <Loading />

    return (
        <ResizablePanelGroup direction="horizontal" className="!h-[800px] rounded-lg border">
            <ResizablePanel defaultSize={25} className="h-full p-4">
                <div className="flex h-full flex-col gap-4">
                    <div className="flex flex-shrink-0 flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <div className="w-[90%]">
                                <Input
                                    placeholder="Tìm kiếm đoạn chat"
                                    value={keySearch}
                                    onChange={(e) => setKeySearch(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <FaPlus className="size-5 text-primary" />
                            </Button>
                        </div>
                        <Tabs defaultValue="all">
                            <TabsList className="grid w-[200px] grid-cols-2 gap-4">
                                <TabsTrigger value="all">Tất cả</TabsTrigger>
                                <TabsTrigger value="unread">Chưa đọc</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all"></TabsContent>
                            <TabsContent value="unread"></TabsContent>
                        </Tabs>
                    </div>
                    <ScrollArea className="flex h-full flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4">
                            {conversationsData &&
                                conversationsData.conversations?.map((message, index) => {
                                    const lastMessageDate = parse(
                                        message.last_message_time,
                                        'yyyy-MM-dd HH:mm:ss',
                                        new Date()
                                    )
                                    const timeDifference = formatDistanceToNow(lastMessageDate, {
                                        locale: vi,
                                        addSuffix: true
                                    })

                                    return (
                                        <div
                                            key={index}
                                            className="flex cursor-pointer items-center justify-between gap-4 border-b border-grey pb-4"
                                        >
                                            <div
                                                className="flex items-center gap-3"
                                                onClick={() => setConversationId(message.conversation_id)}
                                            >
                                                <div className="flex-shrink-0">
                                                    <Avatar>
                                                        <AvatarImage
                                                            className="object-cover"
                                                            src={getImagesUrl(message?.avatar || '')}
                                                            alt={message?.name}
                                                        />
                                                        <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                            {message?.name.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="font-semibold">{message.name}</p>
                                                    <p className="text-sm">{message.last_message}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-center gap-2">
                                                <p>{timeDifference}</p>
                                                <p
                                                    className={cn(
                                                        'size-2 rounded-full',
                                                        message.is_read === 1 ? 'bg-secondaryRed' : 'bg-secondaryYellow'
                                                    )}
                                                ></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            {conversationsData?.conversations.length === 0 && <p>Bạn chưa có đoạn chat nào</p>}
                        </div>
                    </ScrollArea>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75} className="p-4">
                {conversationData ? <Message messageData={conversationData} userData={userData} /> : null}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default CommunicateMessage
