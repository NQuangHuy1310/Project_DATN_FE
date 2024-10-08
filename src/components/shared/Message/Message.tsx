import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IMessage } from '@/types/communicate'
import { HiArrowRight } from 'react-icons/hi'
import { RiSendPlaneFill } from 'react-icons/ri'

const Message = ({ messages, handleToggle }: { messages: IMessage[]; handleToggle: () => void }) => {
    return (
        <div className="flex h-full w-full flex-col justify-between">
            <div className="w-full">
                <div className="flex items-center border-b">
                    <HiArrowRight className="mx-4 my-1 size-5 cursor-pointer md:hidden" onClick={handleToggle} />
                    <div className="flex items-center gap-x-4 py-2 md:px-4">
                        <img className="h-10 w-10 rounded-full" src={messages[0].user.avatar!} alt="" />
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">{messages[0].user.name}</p>
                            <p className="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.fromUser ? 'gap-x-3' : 'justify-end gap-x-3 space-x-reverse'}`}
                        >
                            {msg.fromUser && <img className="h-8 w-8 rounded-full" src={msg.user.avatar!} alt="" />}

                            <div className="flex flex-col gap-1">
                                <p
                                    className={`${
                                        msg.fromUser ? 'bg-gray-100' : 'bg-blue-500 text-white'
                                    } rounded-lg p-3 text-xs`}
                                >
                                    {msg.text}
                                </p>
                                <span
                                    className={`flex text-[10px] text-darkGrey ${msg.fromUser ? 'justify-start' : 'justify-end'}`}
                                >
                                    {msg.time}
                                </span>
                            </div>

                            {!msg.fromUser && <img className="h-10 w-10 rounded-full" src={msg.user.avatar!} alt="" />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 border-t px-4 py-2">
                <Input type="text" className="w-full rounded-md border p-2" placeholder="Send your message..." />
                <Button className="h-full rounded-md bg-blue-500 px-3 py-2 text-white">
                    <RiSendPlaneFill className="size-5" />
                </Button>
            </div>
        </div>
    )
}

export default Message
