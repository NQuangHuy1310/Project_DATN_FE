import { useState } from 'react'

import { vi } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { MdEmail } from 'react-icons/md'
import { IoPeople } from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'
import { useGetProfile } from '@/app/hooks/accounts'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

import { getImagesUrl } from '@/lib'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import routes from '@/configs/routes'
const Profile = () => {
    const [showAllCreated, setShowAllCreated] = useState(false)
    const [showAllJoined, setShowAllJoined] = useState(false)

    const email = useGetSlugParams('email')
    const { data: profileUser, isLoading } = useGetProfile(email!)
    const user = profileUser?.user.profile

    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    const createdCourses = showAllCreated
        ? profileUser?.course_by_user || []
        : (profileUser?.course_by_user || []).slice(0, 5)

    const joinedCourses = showAllJoined
        ? profileUser?.courses_user_bought || []
        : (profileUser?.courses_user_bought || []).slice(0, 5)

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-7 rounded-xl bg-white">
            <div className="mx-auto min-h-screen max-w-7xl p-4">
                {/* Header */}
                <div className="relative flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-300 text-white">
                    <p className="font-mono text-2xl md:text-3xl">document.write('Hello, World');</p>
                </div>

                {/* Avatar & Name */}
                <div className="relative mx-auto -mt-20 flex flex-col items-center gap-6 p-6 md:flex-row">
                    <Avatar className="h-24 w-24 rounded-full bg-gray-200 ring-4 ring-white md:h-32 md:w-32">
                        <AvatarImage
                            className="object-cover"
                            src={getImagesUrl(profileUser?.user?.avatar || '')}
                            alt={profileUser?.user?.name}
                        />
                        <AvatarFallback className="bg-slate-500/50 text-3xl font-semibold text-white">
                            {profileUser?.user?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <h1 className="text-center text-xl font-bold md:mb-5 md:mt-auto md:flex-shrink-0 md:text-2xl">
                        {profileUser?.user?.name}
                    </h1>
                </div>

                {/* Main Section */}
                <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row">
                    {/* Left Section */}
                    <div className="flex w-full flex-col gap-5 lg:w-4/12">
                        {/* About Section */}
                        <div className="rounded-xl border bg-white p-4 shadow-lg">
                            <h2 className="text-xl font-semibold">Giới thiệu</h2>
                            <div className="mt-4 flex flex-col gap-3">
                                {user?.bio && (
                                    <div className="flex w-full justify-center border-b py-2">
                                        <p className="text-smb text-center">{user.bio}</p>
                                    </div>
                                )}
                                <p className="flex items-center gap-2 text-sm">
                                    <IoPeople className="text-lg" /> Thành viên của<b>Coursea</b>từ{' '}
                                    {formatTime(profileUser?.user.created_at)}
                                </p>
                                {profileUser?.user.email && (
                                    <p className="flex items-center gap-2 text-sm">
                                        <MdEmail className="text-lg" /> {profileUser.user.email}
                                    </p>
                                )}
                                {user?.phone && (
                                    <p className="flex items-center gap-2 text-sm">
                                        <FaPhoneAlt className="text-lg" />
                                        {user.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="rounded-xl border bg-white p-4 shadow-lg">
                            <h2 className="text-xl font-semibold">Hoạt động gần đây</h2>
                            <p className="mt-2 text-darkGrey">Chưa có hoạt động gần đây</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex w-full flex-col gap-5 lg:w-8/12">
                        {/* Created Courses */}
                        <div className="rounded-xl border bg-white p-4 shadow-lg">
                            <h2 className="text-2xl font-semibold">Các khóa học đã tạo</h2>
                            {createdCourses && createdCourses?.length > 0 ? (
                                createdCourses.map((course) => (
                                    <Link
                                        to={routes.courseDetail.replace(':slug', course.slug)}
                                        key={course.id}
                                        className="my-2 flex flex-col gap-4 border-b pb-3 sm:flex-row"
                                    >
                                        <div className="w-full sm:w-5/12">
                                            <img
                                                src={getImagesUrl(course.thumbnail || '')}
                                                className="h-36 w-full rounded-xl object-cover"
                                                alt={course.name}
                                            />
                                        </div>
                                        <div className="w-full sm:w-7/12">
                                            <h3 className="text-lg font-bold">{course.name}</h3>
                                            <p className="mt-1 line-clamp-3 text-sm text-darkGrey">
                                                {course.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="mt-2 text-darkGrey">Chưa có khóa học nào</p>
                            )}
                            {profileUser?.course_by_user && profileUser?.course_by_user.length > 5 && (
                                <Button onClick={() => setShowAllCreated(!showAllCreated)} className="mt-3">
                                    {showAllCreated ? 'Ẩn bớt' : 'Xem tất cả'}
                                </Button>
                            )}
                        </div>

                        {/* Joined Courses */}
                        <div className="rounded-xl border bg-white p-4 shadow-lg">
                            <h2 className="text-2xl font-semibold">Các khóa học đã tham gia</h2>
                            {joinedCourses && joinedCourses?.length > 0 ? (
                                joinedCourses.map((course) => (
                                    <Link
                                        to={routes.courseDetail.replace(':slug', course.slug)}
                                        key={course.id}
                                        className="my-2 flex flex-col gap-4 border-b pb-3 sm:flex-row"
                                    >
                                        <div className="w-full sm:w-5/12">
                                            <img
                                                src={getImagesUrl(course.thumbnail || '')}
                                                className="h-32 w-full rounded-xl object-cover"
                                                alt={course.name || 'Thumbnail'}
                                            />
                                        </div>
                                        <div className="w-full sm:w-7/12">
                                            <h3 className="text-lg font-bold">{course.name}</h3>
                                            <p className="mt-1 text-sm text-darkGrey">
                                                {course.description || 'Không có mô tả'}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="mt-2 text-darkGrey">Chưa có khóa học nào</p>
                            )}
                            {profileUser?.courses_user_bought && profileUser?.courses_user_bought.length > 5 && (
                                <Button onClick={() => setShowAllJoined(!showAllJoined)} className="mt-3">
                                    {showAllJoined ? 'Ẩn bớt' : 'Xem tất cả'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
