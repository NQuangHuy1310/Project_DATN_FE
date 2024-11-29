import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useCourseMyBought } from '@/app/hooks/accounts/useMyBought'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getImagesUrl } from '@/lib'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { IoPeople } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MdEmail } from 'react-icons/md'

const Profile = () => {
    const { user } = useGetUserProfile()
    const { data: myCourse, isLoading } = useCourseMyBought()
    const [showAll, setShowAll] = useState(false)

    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    const coursesToShow = showAll ? myCourse?.data : myCourse?.data.slice(0, 5)
    if (isLoading) return <Loading />

    return (
        <div className="mx-auto min-h-screen max-w-7xl overflow-hidden rounded-xl">
            {/* Header */}
            <div className="relative flex h-64 w-full items-center justify-center rounded-xl bg-gradient-to-br from-primary to-pink-300 text-white">
                <p className="font-mono text-2xl md:text-3xl">document.write('Hello, World');</p>
            </div>

            {/* Avatar & Name */}
            <div className="relative mx-auto -mt-20 flex flex-col items-center gap-6 p-6 md:flex-row">
                <Avatar className="h-24 w-24 rounded-full bg-gray-200 ring-4 ring-white md:h-32 md:w-32">
                    <AvatarImage className="object-cover" src={getImagesUrl(user?.avatar || '')} alt={user?.name} />
                    <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                        {user?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <h1 className="text-center text-xl font-bold md:mb-5 md:mt-auto md:flex-shrink-0 md:text-2xl">
                    {user?.name}
                </h1>
            </div>

            {/* Profile Section */}
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-5 p-4 md:flex-row">
                    {/* Left Section */}
                    <div className="flex w-full flex-col gap-5 md:w-5/12">
                        {/* About Section */}
                        <div className="rounded-xl bg-white p-4 shadow-lg">
                            <h2 className="text-xl font-semibold">Giới thiệu</h2>
                            {/* {user?.bio && <p className="mt-2 text-sm text-gray-600">{user.bio}</p>} */}
                            {user && (
                                <div className="mt-4 flex flex-col gap-3">
                                    <p className="flex items-center gap-2 text-sm">
                                        <IoPeople className="size-5" /> Thành viên của <b>Coursea</b> từ{' '}
                                        {formatTime(user?.created_at)}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm">
                                        <MdEmail className="size-5" /> {user.email}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Recent Activities */}
                        <div className="rounded-xl bg-white p-4 shadow-lg">
                            <h2 className="text-xl font-semibold">Hoạt động gần đây</h2>
                            <p className="mt-2 text-gray-600">Chưa có hoạt động gần đây</p>
                        </div>
                    </div>

                    {/* Right Section (Courses) */}
                    <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-4 shadow-lg md:w-7/12">
                        <h2 className="text-xl font-semibold">Các khóa học đã tham gia</h2>
                        {/* Course Card */}
                        {coursesToShow?.map((course) => (
                            <div key={course.id} className="my-2 flex flex-col gap-4 border-b pb-3 md:flex-row">
                                <div className="w-full md:w-5/12">
                                    <img
                                        src={getImagesUrl(course.thumbnail)}
                                        className="h-32 w-full rounded-xl object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="w-full md:w-7/12">
                                    <h3 className="text-lg font-bold">{course.name}</h3>
                                    <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* Show All Button */}
                        {myCourse?.data && myCourse?.data?.length > 5 && (
                            <div>
                                <Button onClick={() => setShowAll(!showAll)}>
                                    {showAll ? 'Ẩn bớt' : 'Xem tất cả'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
