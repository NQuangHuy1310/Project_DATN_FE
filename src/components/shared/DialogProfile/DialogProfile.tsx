import { Dispatch, SetStateAction } from 'react'

import { IUserData } from '@/types'
import { Button } from '@/components/ui/button'
import backgroundImage from '@/assets/background.jpg'
import { getImagesUrl, getInfoOrPlaceholder, truncate } from '@/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes'

interface DialogProfileProps {
    openDialog: boolean
    userData: IUserData
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const DialogProfile = ({ openDialog, setOpenDialog, userData }: DialogProfileProps) => {
    const navigate = useNavigate()

    const { profile } = userData ?? {}

    const handleNavigateToChat = () => {
        navigate(`${routes.instructorMessage}?receiver_to=${userData?.id}`)
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent
                className="max-w-[500px] overflow-hidden rounded-lg bg-white p-6 shadow-lg"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">Thông tin tài khoản</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="h-[200px] flex-shrink-0">
                        <div className="relative flex h-[150px] flex-col items-start gap-2">
                            <img
                                src={backgroundImage}
                                alt="Background Image"
                                className="h-full w-full rounded-md object-cover shadow-md"
                            />
                            <div className="absolute bottom-0 left-0 h-[100px] w-[100px] translate-y-1/2 transform overflow-hidden rounded-full border-4 border-white shadow-lg">
                                <Avatar className="h-full w-full">
                                    <AvatarImage
                                        className="h-full w-full rounded-full object-cover"
                                        src={getImagesUrl(userData?.avatar || '')}
                                        alt={userData?.name}
                                    />
                                    <AvatarFallback className="rounded-full bg-primary text-2xl font-semibold text-white">
                                        {userData?.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <h4 className="w-full text-center text-xl font-bold">{userData?.name}</h4>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="default" className="flex-1" onClick={handleNavigateToChat}>
                            Nhắn tin
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(routes.profileUser.replace(':email', userData?.email))}
                        >
                            Xem trang cá nhân
                        </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold text-gray-800">Thông tin cá nhân</h5>
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-2 font-medium text-black">
                                <p>Email</p>
                                <p>Số điện thoại</p>
                                <p>Kinh nghiệm</p>
                                <p>Bio</p>
                                <p>Người theo dõi</p>
                            </div>
                            <div className="flex flex-1 flex-col gap-2 overflow-hidden">
                                <a href={`mailto:${userData?.email}`}>{getInfoOrPlaceholder(userData?.email)}</a>
                                <a href={`tel:${profile?.phone}`}>{getInfoOrPlaceholder(profile?.phone)}</a>
                                <p>{truncate(getInfoOrPlaceholder(profile?.experience), 30)}</p>
                                <p>{truncate(getInfoOrPlaceholder(profile?.bio), 30)}</p>
                                <p>{getInfoOrPlaceholder(profile?.following, 'Chưa có người theo dõi')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DialogProfile
