import { vi } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { MdEmail } from 'react-icons/md'
import { IoPeople } from 'react-icons/io5'
import { FaPhoneAlt } from 'react-icons/fa'
import { useGetProfile } from '@/app/hooks/accounts'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

import { getImagesUrl } from '@/lib'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import routes from '@/configs/routes'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Course from '@/components/shared/Course'
import CourseMyBought from '@/components/shared/Course/CourseMyBought'
const Profile = () => {
    const email = useGetSlugParams('email')
    const { data: profileUser, isLoading } = useGetProfile(email!)
    const user = profileUser?.user.profile

    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }
    const createdCourses = profileUser?.courses_by_user
    const joinedCourses = profileUser?.courses_user_bought

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-7 rounded-xl bg-white">
            <div className="mx-auto min-h-screen w-full max-w-7xl p-4">
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

                    <h1 className="text-center text-xl font-bold md:mb-8 md:mt-auto md:flex-shrink-0 md:text-2xl">
                        {profileUser?.user?.name}
                    </h1>
                </div>

                {/* profileUser Section */}
                <div className="mx-auto flex flex-col gap-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-6">
                            {/* About Section */}
                            <div className="rounded-xl border bg-white p-5 shadow-lg">
                                <h2 className="text-xl font-semibold">Giới thiệu</h2>
                                <div className="mt-4 flex flex-col gap-3">
                                    {user?.bio && (
                                        <div className="flex w-full justify-center border-b py-2">
                                            <p className="text-smb break-words text-center">{user.bio}</p>
                                        </div>
                                    )}
                                    <span className="flex items-center gap-2 break-words text-sm">
                                        <IoPeople className="text-lg" />
                                        Thành viên của <span className="font-semibold">Coursea</span> từ{' '}
                                        {formatTime(profileUser?.user.created_at)}
                                    </span>
                                    {profileUser?.user.email && (
                                        <p className="flex items-center gap-2 break-words text-sm">
                                            <MdEmail className="text-lg" /> {profileUser.user.email}
                                        </p>
                                    )}
                                    {user?.phone && (
                                        <p className="flex items-center gap-2 break-words text-sm">
                                            <FaPhoneAlt className="text-lg" />
                                            {user.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            {/* About Section */}
                            <div className="h-full rounded-xl border bg-white p-5 shadow-lg">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl font-semibold">Hoạt động gần đây</h2>
                                    <p>Chưa có hoạt động nào</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {profileUser?.courses_by_user && profileUser?.courses_by_user.length > 0 && (
                        <div className="card col-span-12 flex w-full flex-1 flex-col gap-7 overflow-hidden rounded-2xl border shadow-lg md:col-span-7 lg:col-span-9">
                            <Carousel
                                className="w-full"
                                opts={{
                                    align: 'start'
                                }}
                            >
                                <div className="flex justify-between">
                                    <h5 className="text-lg font-medium text-black md:text-xl">Khoá học đã tạo</h5>
                                    <div className="flex w-20 gap-2 text-right">
                                        <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                        <CarouselNext className="!translate-y-0 !shadow-none" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <CarouselContent className="w-full gap-4">
                                        {createdCourses &&
                                            createdCourses.length > 0 &&
                                            createdCourses?.map((item, index) => (
                                                <CarouselItem
                                                    key={index}
                                                    className="w-full min-w-0 basis-full md:basis-[367px]"
                                                >
                                                    <Course data={item} page={routes.courseDetail} />
                                                </CarouselItem>
                                            ))}
                                    </CarouselContent>
                                </div>
                            </Carousel>
                        </div>
                    )}

                    {profileUser?.courses_user_bought && profileUser?.courses_user_bought.length > 0 && (
                        <div className="card col-span-12 flex w-full flex-1 flex-col gap-7 overflow-hidden rounded-2xl border shadow-lg md:col-span-7 lg:col-span-9">
                            <Carousel
                                className="w-full"
                                opts={{
                                    align: 'start'
                                }}
                            >
                                <div className="flex justify-between">
                                    <h5 className="text-lg font-medium text-black md:text-xl">Khoá học đã tham gia</h5>
                                    <div className="flex w-20 gap-2 text-right">
                                        <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                        <CarouselNext className="!translate-y-0 !shadow-none" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <CarouselContent className="w-full gap-4">
                                        {joinedCourses &&
                                            joinedCourses.length > 0 &&
                                            joinedCourses?.map((item, index) => (
                                                <CarouselItem
                                                    key={index}
                                                    className="w-full min-w-0 basis-full md:basis-[367px]"
                                                >
                                                    <CourseMyBought data={item} page={routes.courseDetail} />
                                                </CarouselItem>
                                            ))}
                                    </CarouselContent>
                                </div>
                            </Carousel>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
