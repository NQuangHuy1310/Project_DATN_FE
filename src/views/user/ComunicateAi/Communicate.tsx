import { useState, useEffect, useRef } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { getImagesUrl } from '@/lib'
import Loading from '@/components/Common/Loading/Loading'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { BsLayoutSidebar, BsLayoutSidebarInset } from 'react-icons/bs'
import { useCommunicateChatAI, useFilterChatAI } from '@/app/hooks/others'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Communicate = () => {
    const historyList = ['today', 'yesterday', 'last_week', 'last_month']

    const [question, setQuestion] = useState<string>('')
    const [messages, setMessages] = useState<{ text: string; type: 'user' | 'ai'; isTyping?: boolean }[]>([
        { text: '', type: 'ai', isTyping: true }
    ])

    const [status, setStatus] = useState<string>('today')
    const [isToggle, setIsToggle] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { user } = useGetUserProfile()
    const { mutateAsync: chatAI } = useCommunicateChatAI()
    const { data, isLoading } = useFilterChatAI(status)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const formattedMessages = data.flatMap((item: { question: string; answer: string }) => [
                { text: item.question, type: 'user' },
                { text: item.answer, type: 'ai' }
            ])
            setMessages(formattedMessages)
        } else {
            setMessages([])
        }
    }, [data])

    const handleChatAI = async () => {
        if (user && question.trim()) {
            const trimmedQuestion = question.trim()
            setQuestion('')
            setMessages((prev) => [...prev, { text: trimmedQuestion, type: 'user' }])

            const response = await chatAI(trimmedQuestion)
            const answer = response?.answer || 'Không thể trả lời câu hỏi này.'

            await typeAnswer(answer)
        }
    }

    const typeAnswer = async (answer: string) => {
        const typingMessage = { text: '', type: 'ai', isTyping: true }
        setMessages((prev) => [...prev, typingMessage])

        for (let i = 0; i <= answer.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 10))
            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1 && msg.isTyping ? { ...msg, text: answer.slice(0, i) } : msg
                )
            )
        }

        setMessages((prev) =>
            prev.map((msg, index) => (index === prev.length - 1 && msg.isTyping ? { ...msg, isTyping: false } : msg))
        )
    }

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus)
    }
    const handleIsToggle = () => setIsToggle(!isToggle)
    if (isLoading) return <Loading />

    return (
        <div className="flex h-[85vh] flex-col overflow-hidden rounded-md sm:flex-row">
            {/* Sidebar */}
            <div
                className={`border-r bg-white transition-all duration-300 ${
                    isToggle ? 'w-0 opacity-0 sm:w-0' : 'w-full opacity-100 sm:w-3/12'
                }`}
            >
                <div className="p-5">
                    {!isToggle && (
                        <>
                            <div className="relative">
                                <BsLayoutSidebar
                                    onClick={handleIsToggle}
                                    className={`absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-xl transition-all duration-300 hover:text-primary ${isToggle ? 'hidden' : 'block'}`}
                                />
                                <h3 className="border-b pb-2 text-center text-xl font-semibold">Lịch sử câu hỏi</h3>
                            </div>
                            <ul className="flex flex-col gap-3 pt-5">
                                {historyList.map((date) => (
                                    <li
                                        key={date}
                                        className={`flex cursor-pointer items-center gap-3 rounded px-2 py-2.5 ${
                                            status === date ? 'bg-primary/70 font-semibold text-white' : ''
                                        } `}
                                        onClick={() => handleStatusChange(date)}
                                    >
                                        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-black">#</span>
                                        {
                                            {
                                                today: 'Hôm nay',
                                                yesterday: 'Hôm qua',
                                                last_week: '7 ngày trước',
                                                last_month: '30 ngày trước'
                                            }[date]
                                        }
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex flex-col transition-all duration-300 ${isToggle ? 'w-full' : 'w-full sm:w-9/12'}`}>
                {/* Header */}
                <div className="sticky top-0 z-10 w-full bg-white shadow">
                    <div className="flex items-center gap-3 border-b p-4">
                        <BsLayoutSidebarInset
                            onClick={handleIsToggle}
                            className={`cursor-pointer text-xl transition-all duration-300 hover:text-primary ${!isToggle ? 'hidden' : 'block'}`}
                        />
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://dl.memuplay.com/new_market/img/com.smartwidgetlabs.chatgpt.icon.2023-06-18-09-30-08.png"
                            alt=""
                        />
                        <p className="font-semibold">Chat AI</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="scrollbar-hide flex-grow overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} my-4 gap-3`}
                            >
                                {msg.type === 'ai' && (
                                    <img
                                        className="h-10 w-10 rounded-full border"
                                        src="https://dl.memuplay.com/new_market/img/com.smartwidgetlabs.chatgpt.icon.2023-06-18-09-30-08.png"
                                        alt="AI Avatar"
                                    />
                                )}
                                <div
                                    className={`max-w-[70%] rounded-xl p-3 text-sm ${
                                        msg.type === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-900'
                                    }`}
                                >
                                    {msg.text || ''}
                                </div>
                                {msg.type === 'user' && (
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={getImagesUrl(user?.avatar || '')}
                                            alt={user?.name || ''}
                                            className="h-full w-full object-cover"
                                        />
                                        <AvatarFallback className="flex items-center justify-center bg-slate-500/50 font-semibold">
                                            {user?.name?.charAt(0) || ''}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Không có tin nhắn nào.</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="sticky bottom-0 bg-white shadow">
                    <div className="flex gap-2 border-t p-4">
                        <input
                            type="text"
                            className="flex-grow rounded-md border p-2 outline-none"
                            autoFocus
                            placeholder="Gửi tin nhắn..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleChatAI()}
                        />
                        <button onClick={handleChatAI} className="rounded-md bg-blue-500 px-4 py-2 text-white">
                            <RiSendPlaneFill className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Communicate
