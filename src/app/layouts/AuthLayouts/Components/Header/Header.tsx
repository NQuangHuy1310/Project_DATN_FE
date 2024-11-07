import { Link, NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { IoSearchCircle } from 'react-icons/io5'
import { useEffect, useState } from 'react'

import logo from '@/assets/Union.svg'
import routes from '@/configs/routes'
import { Input } from '@/components/ui/input'
import { TiDelete } from 'react-icons/ti'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/app/hooks/categories'
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io'
import { HiX } from 'react-icons/hi'
import { getAccessTokenFromLocalStorage } from '@/lib/common'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import UserButton from '@/components/shared/UserButton'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [openSearch, setIsOpenSearch] = useState(false)

    const toggleMenu = () => setMenuOpen((prev) => !prev)
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const { data: categories = [] } = useGetCategories()

    const token = getAccessTokenFromLocalStorage()
    const { user } = useGetUserProfile()

    useEffect(() => {
        if (menuOpen || openSearch) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [menuOpen, openSearch])

    return (
        <header className="fixed left-0 right-0 top-0 z-50 h-[120px] border-b-[1px] bg-white shadow-sm">
            <div className="mx-auto h-full max-w-[1200px] px-5 py-3 lg:px-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-4 md:gap-10">
                        <FaBars onClick={toggleMenu} className="block size-5 cursor-pointer lg:hidden" />
                        <Link to={routes.home} className="flex items-center gap-3" aria-label="Home">
                            <div className="h-10 w-10">
                                <img
                                    src={logo}
                                    alt="Coursea - Học trực tuyến"
                                    className="h-full w-full rounded-sm object-cover"
                                />
                            </div>
                            <p className="hidden text-2xl font-semibold lg:block">Coursea</p>
                        </Link>
                        <div className="hidden md:block">
                            <Select>
                                <SelectTrigger className="!h-[35px] min-w-[100px] text-primary hover:text-primary lg:!h-[40px] lg:min-w-[130px]">
                                    <SelectValue placeholder="Danh mục" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((cate, index) => (
                                            <SelectItem value={cate.name} key={index}>
                                                {cate.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative hidden w-full min-w-[380px] lg:block">
                            <Input
                                placeholder="Tìm kiếm hoá học, bài viết, video,..."
                                className="w-full rounded-full px-4 caret-primary"
                            />
                            <IoSearchCircle className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-primary" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {token && user ? (
                            <div className="flex items-center gap-2">
                                <h2 className="hidden text-base font-semibold md:block">{user.name}</h2>
                                <UserButton />
                            </div>
                        ) : (
                            <div className="hidden items-center gap-3 md:flex">
                                <Link to={routes.register} className="hidden md:flex">
                                    <Button variant="secondary">Đăng ký</Button>
                                </Link>
                                <Link to={routes.login}>
                                    <Button>Đăng nhập</Button>
                                </Link>
                            </div>
                        )}
                        <div className="block md:hidden" onClick={() => setIsOpenSearch(true)}>
                            <IoIosSearch className="size-5 cursor-pointer" />
                        </div>
                    </div>
                </div>
                {menuOpen && (
                    <div
                        className={`fixed left-0 top-0 z-50 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 md:w-1/2 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="relative h-[90%]">
                            <TiDelete
                                className="absolute right-2 top-1 size-6 cursor-pointer"
                                onClick={() => setMenuOpen(false)}
                            />
                            <Link
                                to={routes.home}
                                className="flex items-center justify-center gap-3 py-2"
                                aria-label="Home"
                            >
                                <div className="h-10 w-10">
                                    <img
                                        src={logo}
                                        alt="Coursea - Học trực tuyến"
                                        className="h-full w-full rounded-sm object-cover"
                                    />
                                </div>
                                <p className="text-xl font-semibold">Coursea</p>
                            </Link>
                            <div className="flex w-full cursor-pointer justify-between px-3" onClick={toggleDropdown}>
                                <p className="text-base">Danh mục</p> <IoIosArrowDown className="size-4" />
                            </div>
                            {isOpen && (
                                <div className="mt-1 bg-white">
                                    {categories.map((cate, index) => (
                                        <p key={index} className="px-5 py-2 text-sm hover:bg-gray-100">
                                            {cate.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center justify-center gap-3 px-3 pt-8 md:flex-col">
                                <Link to={routes.register} className="flex w-full">
                                    <Button variant="secondary" className="w-full">
                                        Đăng ký
                                    </Button>
                                </Link>
                                <Link to={routes.login} className="w-full">
                                    <Button className="w-full">Đăng nhập</Button>
                                </Link>
                            </div>
                            <Link to={routes.login} className="absolute bottom-0 w-full">
                                <Button className="w-full">Tham gia ngay</Button>
                            </Link>
                        </div>
                    </div>
                )}
                {openSearch && (
                    <div
                        className={`fixed left-0 top-0 z-50 h-screen w-full transform bg-white shadow-lg transition-transform duration-300 md:w-1/2 ${openSearch ? 'translate-y-0' : '-translate-y-full'}`}
                    >
                        <div className="relative flex">
                            <div className="flex w-8 items-center justify-center bg-primary">
                                <IoIosSearch className="size-4" />
                            </div>
                            <Input
                                placeholder="Tìm kiếm hoá học, bài viết, video,..."
                                className="h-8 w-full rounded-none px-5 caret-primary outline-none focus-visible:ring-0"
                            />
                            <HiX
                                className="absolute right-1 top-[5px] size-5 cursor-pointer"
                                onClick={() => setIsOpenSearch(false)}
                            />
                        </div>
                    </div>
                )}
                <nav className="flex pt-5">
                    <ul className="flex gap-5 *:text-sm lg:text-base lg:*:text-base">
                        <li>
                            <NavLink
                                to={routes.home}
                                className={({ isActive }) =>
                                    `px-2 pb-5 lg:pb-[18px] ${isActive ? 'border-b-[3px] border-primary font-semibold' : ''}`
                                }
                            >
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/home-courses'}
                                className={({ isActive }) =>
                                    `px-2 pb-5 lg:pb-[18px] ${isActive ? 'border-b-[3px] border-primary font-semibold' : ''}`
                                }
                            >
                                Khóa học
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={routes.latestPost}
                                className={({ isActive }) =>
                                    `px-2 pb-5 lg:pb-[18px] ${isActive ? 'border-b-[3px] border-primary font-semibold' : ''}`
                                }
                            >
                                Bài viết
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {menuOpen && <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={toggleMenu}></div>}
            </div>
        </header>
    )
}

export default Header
