/* eslint-disable indent */
import { FaRegBell } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

import routes from '@/configs/routes'
import useGetUserProfile from '@/hooks/useGetUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserHeader() {
    const location = useLocation()
    const route = location.pathname

    const { user } = useGetUserProfile()

    const getTitle = (): string => {
        switch (route) {
            case routes.overview:
                return `Hi, ${user?.name}`
            case routes.exploreCourses:
                return 'Khám phá khoá học'
            case routes.myCourse:
                return 'Khoá học của tôi'
            case routes.teacher:
                return 'Giảng viên'
            case routes.settings:
                return 'Cài đặt'
            default:
                return `Hi, ${user?.name}`
        }
    }
    return (
        <header className="fixed left-64 right-0 z-50 flex h-20 items-center justify-between bg-white px-8 shadow-sm">
            <div>
                <h2 className="text-3xl font-medium">{getTitle()}</h2>
            </div>
            <div className="flex items-center gap-5">
                <FaRegBell className="size-5 cursor-pointer text-black" />
                <Avatar className="cursor-pointer">
                    <AvatarImage src="../public/ảnh.jpg" alt="" />
                    <AvatarFallback>TT</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

export default UserHeader
