/* eslint-disable indent */
import { FaBars, FaRegBell } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import routes from '@/configs/routes'
import useGetUserProfile from '@/hooks/useGetUser'
import UserButton from '@/components/shared/UserButton'

function UserHeader({ toggleSidebar, title }: { toggleSidebar: () => void, title: string }) {
    const location = useLocation()
    const route = location.pathname

    const { user } = useGetUserProfile()

    const getTitle = (): string => {
        if (route.includes('/account')) {
            return 'Tài khoản'
        }
        if (route == routes.dashboard) {
            return title + user?.name
        }
        return title
    }
    return (
        <header className="fixed left-0 right-0 z-50 flex h-20 items-center justify-between bg-white px-8 lg:left-64">
            <FaBars className="cursor-pointer text-2xl lg:hidden" onClick={toggleSidebar} />
            <div className="hidden lg:block">
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
