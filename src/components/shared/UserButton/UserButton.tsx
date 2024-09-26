import { LuLogOut } from 'react-icons/lu'

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
                    <AvatarImage src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                        <LuLogOut className="mr-2 size-4" />
                        <span>Đăng xuất</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
