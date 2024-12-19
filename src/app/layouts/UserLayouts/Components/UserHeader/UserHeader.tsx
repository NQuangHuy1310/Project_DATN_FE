import { FaBars } from 'react-icons/fa'

import UserButton from '@/components/shared/UserButton'
import NotificationButton from '@/components/shared/NotificationButton'
import CourseHistoryButton from '@/components/shared/CourseHistoryButton/CourseHistoryButton'
import CourseWishListButton from '@/components/shared/CourseWishListButton'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImagesUrl } from '@/lib/common'
import { IoSearchOutline } from 'react-icons/io5'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/app/hooks/custom/useDebounce'
import { useSearch } from '@/app/hooks/others/useOthers'
import routes from '@/configs/routes'

function UserHeader({
    isSidebar,
    toggleSidebar,
    title
}: {
    isSidebar: boolean
    toggleSidebar: () => void
    title: string
}) {
    const [search, setSearch] = useState<string>('')
    const [visible, setVisible] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)

    const debouncedSearch = useDebounce(search, 500)
    const { data: dataSearch, isLoading: loadingSearch } = useSearch(debouncedSearch)

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
        <header
            className={`fixed left-0 right-0 z-50 flex h-headerHight items-center justify-between border-b border-grey bg-white px-8 md:border-none ${isSidebar ? 'lg:left-64' : 'lg:left-24'} `}
        >
            <FaBars className="cursor-pointer text-xl text-darkGrey lg:hidden" onClick={toggleSidebar} />
            <div className="hidden lg:block">
                <h2 className="text-xl font-medium">{title}</h2>
            </div>
            <div className="flex items-center gap-10">
                <div className="relative hidden w-full min-w-[400px] lg:block">
                    <Input
                        placeholder="Tìm kiếm hoá học, bài viết, người hướng dẫn,..."
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
                                            <Link className="text-sm text-darkGrey" to={routes.course}>
                                                Xem thêm
                                            </Link>
                                        </div>
                                        <div className="flex flex-col gap-3 py-4">
                                            {dataSearch?.courses.map((course, index) => (
                                                <Link
                                                    to={routes.courseDetail.replace(':slug', course.slug)}
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
                                                    to={routes.instructorDetail.replace(':id', String(user.id))}
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
                <div className="flex items-center gap-5">
                    <CourseHistoryButton />
                    <CourseWishListButton />
                    <NotificationButton />
                    <UserButton />
                </div>
            </div>
        </header>
    )
}

export default UserHeader
