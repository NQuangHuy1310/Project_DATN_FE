import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { HiX } from 'react-icons/hi'
import { FaBars } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { IoSearchOutline } from 'react-icons/io5'
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io'

import logo from '@/assets/Union.svg'
import routes from '@/configs/routes'
import TopBar from '@/components/shared/TopBar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import UserButton from '@/components/shared/UserButton'
import { useSearch } from '@/app/hooks/others'
import { useDebounce } from '@/app/hooks/custom/useDebounce'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useGetCategories } from '@/app/hooks/categories'
import { useGetNewVoucher } from '@/app/hooks/payment'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAccessTokenFromLocalStorage, getImagesUrl } from '@/lib/common'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Pusher from 'pusher-js'
import { PUSHER_KEY } from '@/configs/pusher'
import { useQueryClient } from '@tanstack/react-query'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [openSearch, setIsOpenSearch] = useState(false)
    const [search, setSearch] = useState<string>('')
    const [visible, setVisible] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)

    const queryClient = useQueryClient()

    const debouncedSearch = useDebounce(search, 500)
    const { data: dataSearch, isLoading: loadingSearch } = useSearch(debouncedSearch)

    const toggleMenu = () => setMenuOpen((prev) => !prev)
    const toggleDropdown = () => setIsOpen((prev) => !prev)

    const { data: categories = [] } = useGetCategories()
    const { data: newVoucher } = useGetNewVoucher()
    const voucher = newVoucher?.voucher?.[0] ?? null

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

    useEffect(() => {
        Pusher.logToConsole = true
        const pusher = new Pusher(PUSHER_KEY, {
            cluster: 'ap1'
        })
        const channel = pusher.subscribe('vouchers')
        channel.bind('App\\Events\\VoucherCreated', (data: any) => {
            if (data) {
                queryClient.invalidateQueries({
                    queryKey: ['voucher'],
                    exact: true
                })
            }
        })
        return () => {
            channel.unbind_all()
            channel.unsubscribe()
            pusher.disconnect()
        }
    }, [queryClient])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                setVisible(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <header>
            {voucher ? <TopBar endTime={voucher.end_time} voucherCode={voucher.code} /> : null}
            <div className="z-50 h-[120px] border-b-[1px] bg-white shadow-sm">
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
                            <div className="relative hidden w-full min-w-[400px] lg:block">
                                <Input
                                    placeholder="Tìm kiếm hoá học, bài viết, video,..."
                                    className="w-full rounded-full px-4 caret-primary"
                                    onChange={(e) => setSearch(e.target.value)}
                                    onClick={() => setVisible(true)}
                                />
                                {search.length > 0 && visible && (
                                    <div
                                        ref={boxRef}
                                        className="absolute top-[120%] z-40 max-h-[75vh] w-full overflow-y-auto rounded-lg border bg-white px-4 py-3 shadow"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2">
                                                {loadingSearch && search.length > 1 ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-darkGrey border-t-transparent"></div>
                                                    </div>
                                                ) : (
                                                    <IoSearchOutline className="size-5 text-primary" />
                                                )}
                                                <span className="text-darkGrey">Kết quả cho '{search}'</span>
                                            </div>
                                            {dataSearch?.courses && dataSearch.courses.length > 0 && (
                                                <div>
                                                    <div className="flex items-center justify-between border-b pb-3">
                                                        <h2 className="text-base font-semibold">KHÓA HỌC</h2>
                                                        <Link
                                                            className="text-sm text-darkGrey"
                                                            to={routes.courseOutstanding}
                                                        >
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col gap-3 py-4">
                                                        {dataSearch?.courses.map((course, index) => (
                                                            <Link
                                                                to={routes.courseDetailNoLogin.replace(
                                                                    ':slug',
                                                                    course.slug
                                                                )}
                                                                key={index}
                                                                className="flex items-center gap-4"
                                                            >
                                                                <img
                                                                    src={getImagesUrl(course.thumbnail)}
                                                                    alt={course.name}
                                                                    className="h-10 w-10 rounded-full"
                                                                />
                                                                <h3 className="w-[300px] overflow-hidden truncate whitespace-nowrap text-base">
                                                                    {course.name}
                                                                </h3>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {dataSearch?.posts && dataSearch.posts.length > 0 && (
                                                <div>
                                                    <div className="flex items-center justify-between border-b pb-3">
                                                        <h2 className="text-base font-semibold">BÀI VIẾT</h2>
                                                        <Link className="text-sm text-darkGrey" to={routes.posts}>
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col gap-3 py-4">
                                                        {dataSearch?.posts.map((post, index) => (
                                                            <Link
                                                                to={routes.postsDetail.replace(':slug', post.slug)}
                                                                key={index}
                                                                className="flex items-center gap-4"
                                                            >
                                                                <img
                                                                    src={getImagesUrl(post.thumbnail)}
                                                                    alt={post.title}
                                                                    className="h-10 w-10 rounded-full"
                                                                />
                                                                <h3 className="w-[300px] overflow-hidden truncate whitespace-nowrap text-base">
                                                                    {post.title}
                                                                </h3>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {dataSearch?.teachers && dataSearch.teachers.length > 0 && (
                                                <div>
                                                    <div className="flex items-center justify-between border-b pb-2">
                                                        <h2 className="text-base font-semibold">NGƯỜI HƯỚNG DẪN</h2>
                                                        <Link className="text-sm text-darkGrey" to={routes.instructor}>
                                                            Xem thêm
                                                        </Link>
                                                    </div>
                                                    <div className="flex flex-col gap-3 py-3">
                                                        {dataSearch?.teachers.map((user, index) => (
                                                            <Link
                                                                to={routes.instructorDetail.replace(
                                                                    ':id',
                                                                    String(user.id)
                                                                )}
                                                                key={index}
                                                                className="flex items-center gap-4"
                                                            >
                                                                <Avatar className="size-7 cursor-pointer md:size-10">
                                                                    <AvatarImage
                                                                        className="object-cover"
                                                                        src={getImagesUrl(user?.avatar || '')}
                                                                        alt={user?.name}
                                                                    />
                                                                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                                        {user?.name.charAt(0)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <h3 className="text-base">{user.name}</h3>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                                <div
                                    className="flex w-full cursor-pointer justify-between px-3"
                                    onClick={toggleDropdown}
                                >
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
                                    placeholder="Tìm kiếm hoá học, bài viết, người hướng dẫn,..."
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
                                    to={routes.courseOutstanding}
                                    className={({ isActive }) =>
                                        `px-2 pb-5 lg:pb-[18px] ${isActive ? 'border-b-[3px] border-primary font-semibold' : ''}`
                                    }
                                >
                                    Khóa học
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={routes.postFeatured}
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
            </div>
        </header>
    )
}

export default Header
