import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { TbUserHexagon } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'

import routes from '@/configs/routes'
import { getImagesUrl, removeQuestion } from '@/lib'
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
import { validRoutesMember } from '@/constants'
import { MdPostAdd } from 'react-icons/md'
import { FaRegBookmark, FaRegUser } from 'react-icons/fa'
import { RiBloggerLine } from 'react-icons/ri'

const UserButton = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useGetUserProfile()

    const clearUserAndProfile = useUserStore((state) => state.clearUserAndProfile)

    const handleLogout = async () => {
        await authApis.logout()
        removeAccessToken()
        removeQuestion()
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
                <DropdownMenuContent align="end" className="w-70">
                    <DropdownMenuGroup className="flex flex-col gap-1.5 p-2">
                        <Link to={routes.profileUser.replace(':email', user?.email || '')}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <CgProfile className="size-4 w-8" />
                                <span className="text-sm font-medium">Trang cá nhân</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link to={routes.accountProfile}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <IoSettingsOutline className="size-4 w-8" />
                                <span className="text-sm font-medium">Quản lý tài khoản</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        {validRoutesMember.some((route) => location.pathname.includes(route)) &&
                        (user?.user_type === 'teacher' || user?.user_type === 'admin') ? (
                            <Link to={routes.instructorDashboard}>
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <FaRegUser className="size-4 w-8" />
                                    <span className="text-sm font-medium">Người hướng dẫn</span>
                                </DropdownMenuItem>
                            </Link>
                        ) : (
                            <Link to={routes.userDashboard}>
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <FaRegUser className="size-4 w-8" />
                                    <span className="text-sm font-medium">Học viên</span>
                                </DropdownMenuItem>
                            </Link>
                        )}

                        {user?.user_type !== 'teacher' && user?.user_type !== 'admin' && (
                            <Link to={routes.instructorRegister}>
                                <DropdownMenuItem className="flex items-center gap-2">
                                    <TbUserHexagon className="size-4 w-8" />
                                    <span className="whitespace-nowrap text-sm font-medium">
                                        Đăng ký thành giảng viên
                                    </span>
                                </DropdownMenuItem>
                            </Link>
                        )}
                        <DropdownMenuSeparator />
                        <Link to={routes.newPost}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <MdPostAdd className="size-4 w-8" />
                                <span className="text-sm font-medium">Tạo bài viết</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link to={routes.myPosts}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <RiBloggerLine className="size-4 w-8" />
                                <span className="text-sm font-medium">Bài viết của tôi</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link to={routes.myBookmarks}>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <FaRegBookmark className="size-4 w-8" />
                                <span className="text-sm font-medium">Bài viết đã lưu</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                            <LuLogOut className="mr-2 size-4 w-8" />
                            <span className="text-sm font-medium">Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default UserButton
