/* eslint-disable indent */
import { FaRegBell } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import routes from '@/configs/routes'
import useGetUserProfile from '@/hooks/useGetUser'
import UserButton from '@/components/shared/UserButton'

function UserHeader() {
    const location = useLocation()
    const route = location.pathname

    const { user } = useGetUserProfile()

    const getTitle = (): string => {
        if (route.includes('/account')) {
            return 'Tài khoản'
        }

        switch (route) {
            case routes.dashboard:
                return `Xin chào, ${user?.name}`
            case routes.course:
                return 'Khá phá khoá học'
            case routes.myCourse:
                return 'Khoá học của tôi'
            case routes.searchCourses:
                return 'Tìm kiếm khoá học'
            case routes.instructor:
                return 'Người hướng dẫn'
            case routes.accountSetting:
                return 'Cài đặt tài khoản'
            case routes.notification:
                return 'Thông báo'
            default:
                return `Hi, ${user?.name}`
        }
    }
    return (
        <header className="fixed left-64 right-0 z-50 flex h-20 items-center justify-between bg-white px-8">
            <div>
                <h2 className="text-3xl font-medium">{getTitle()}</h2>
            </div>
            <div className="flex items-center gap-5">
                <Link to={routes.notification}>
                    <FaRegBell className="size-5 cursor-pointer text-black" />
                </Link>
                <UserButton />
            </div>
        </header>
    )
}

export default UserHeader
