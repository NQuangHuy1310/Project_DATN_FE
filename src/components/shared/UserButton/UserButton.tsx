import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { TbUserHexagon } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'

import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authApis } from '@/app/services/accounts'
import { removeAccessToken } from '@/lib'
import { useUserStore } from '@/app/store'

const UserButton = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useGetUserProfile()

    const clearUserAndProfile = useUserStore((state) => state.clearUserAndProfile)

    const handleLogout = async () => {
        await authApis.logout()
        removeAccessToken()
        clearUserAndProfile()
        navigate(routes.home)
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="relative outline-none transition hover:opacity-75">
                    <Avatar className="size-8 cursor-pointer">
                        <AvatarImage className="object-cover" src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                        <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                            {user?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuGroup className="flex flex-col gap-1.5 p-2">
                        {location.pathname.includes(routes.userDashboard) ? (
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to={routes.instructorDashboard} className="flex items-center gap-2">
                                    <TbUserHexagon className="size-4" />
                                    <span className="text-base font-medium">Người hướng dẫn</span>
                                </Link>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to={routes.userDashboard} className="flex items-center gap-2">
                                    <TbUserHexagon className="size-4" />
                                    <span className="text-base font-medium">Học viên</span>
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer">
                            <Link to={routes.accountProfile} className="flex items-center gap-2">
                                <IoSettingsOutline className="size-4" />
                                <span className="text-base font-medium">Quản lý tài khoản</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                            <LuLogOut className="mr-2 size-4" />
                            <span className="text-base font-medium">Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserButton
