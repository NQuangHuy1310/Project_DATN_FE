import { Link } from 'react-router-dom'
import { LuLogOut } from 'react-icons/lu'
import { IoSettingsOutline } from 'react-icons/io5'

import routes from '@/configs/routes'
import { getImagesUrl } from '@/utils'
import useGetUserProfile from '@/hooks/useGetUser'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserButton = () => {
    const { user } = useGetUserProfile()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative outline-none transition hover:opacity-75">
                <Avatar className="size-10 cursor-pointer">
                    <AvatarImage className="object-cover" src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                        {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex flex-col gap-1">
                    <DropdownMenuItem className="cursor-pointer">
                        <Link to={routes.accountProfile} className="flex items-center gap-2">
                            <IoSettingsOutline className="size-4" />
                            <span className="text-base font-medium">Quản lý tài khoản</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <LuLogOut className="mr-2 size-4" />
                        <span className="text-base font-medium">Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
