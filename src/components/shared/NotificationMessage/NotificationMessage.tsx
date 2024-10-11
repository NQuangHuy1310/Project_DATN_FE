import { FaBookAtlas } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'

import { notificationTypes } from '@/constants'
import { INotificationMessage } from '@/types'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { getImagesUrl } from '@/lib'

const NotificationMessage = ({ title, message, notificationType, isRead, senderBy, sentAt }: INotificationMessage) => {
    return (
        <div
            className={`flex items-center justify-between rounded-lg px-5 py-3 ${!isRead && 'bg-softGrey'} cursor-pointer hover:bg-softGrey hover:transition-all`}
        >
            <div className="flex items-center gap-7">
                <div className="flex-shrink-0">
                    {notificationType === notificationTypes.system && (
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                            <IoSettingsOutline className="size-5 text-white" />
                        </div>
                    )}
                    {notificationType === notificationTypes.instructor && (
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary">
                            <FaBookAtlas className="size-5 text-white" />
                        </div>
                    )}
                    {notificationType === notificationTypes.user && (
                        <Avatar>
                            <AvatarImage src={getImagesUrl(senderBy.avatar || '')} alt={senderBy.name} />
                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                {senderBy.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <h5 className="text-base text-black">{title}</h5>
                    <p className="text-sm text-darkGrey">{message}</p>
                </div>
            </div>
            <p className="text-sm text-darkGrey">{sentAt}</p>
        </div>
    )
}

export default NotificationMessage
