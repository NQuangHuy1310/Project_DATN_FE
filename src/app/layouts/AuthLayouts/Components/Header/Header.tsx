import { Link } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { IoSearchSharp } from 'react-icons/io5'

import logo from '@/assets/Union.svg'
import routes from '@/configs/routes'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import UserButton from '@/components/shared/UserButton'
import { getAccessTokenFromLocalStorage } from '@/utils'

const Header = () => {
    const isLogged = getAccessTokenFromLocalStorage()

    return (
        <header className="h-headerHight fixed left-0 right-0 top-0 z-50 border-b-[1px] shadow-sm">
            <div className="mx-auto flex h-full items-center justify-between gap-2 px-4 md:px-6 lg:px-8">
                <Link to={routes.home} className="flex items-center gap-3">
                    <div className="h-[38px] w-[38px]">
                        <img
                            src={logo}
                            alt="Coursea - Học trực tuyến"
                            className="h-full w-full rounded-sm object-cover"
                        />
                    </div>
                    <p className="hidden text-base font-semibold lg:block">Coursea - Nền Tảng Học Trực Tuyến</p>
                </Link>
                <div className="relative w-full max-w-[420px]">
                    <Input
                        placeholder="Tìm kiếm hoá học, bài viết, video,..."
                        className="w-full rounded-full px-8 caret-primary"
                        value=""
                        onChange={() => {}}
                    />
                    <IoSearchSharp className="absolute left-3 top-1/2 size-4 -translate-y-1/2 cursor-pointer opacity-80 hover:opacity-100 hover:transition-all" />
                </div>
                {isLogged ? (
                    <div className="flex items-center gap-5">
                        <Button size="icon" variant="ghost">
                            <FaBell className="size-5 cursor-pointer" />
                        </Button>
                        <UserButton />
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to={routes.register} className="hidden md:flex lg:flex">
                            <Button variant="secondary">Đăng ký</Button>
                        </Link>
                        <Link to={routes.login}>
                            <Button>Đăng nhập</Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
