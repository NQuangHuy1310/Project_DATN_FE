import { useEffect, useState } from 'react'

import { vi } from 'date-fns/locale'
import routes from '@/configs/routes'
import Course from '@/components/shared/Course'
import Loading from '@/components/Common/Loading/Loading'
import Teacher from '@/components/shared/Teacher'
import PostOutStanding from '@/components/shared/Post/PostOutStanding'
import { useAdminPost } from '@/app/hooks/accounts/useUser'
import { useInstructorMonth } from '@/app/hooks/instructors'
import { useGetFeaturedPosts } from '@/app/hooks/posts'
import { formatDistanceToNow } from 'date-fns'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useCourseFree, useCoursePopulate, useCourseToday } from '@/app/hooks/courses/useCourse'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { FaCheckCircle, FaRegUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { formatDuration, getImagesUrl } from '@/lib'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { TbCoinFilled } from 'react-icons/tb'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { IoTimeOutline } from 'react-icons/io5'
import { IoMdStar } from 'react-icons/io'

const Dashboard = () => {
    const [showAdminPost, setShowAdminPost] = useState(false)
    const navigate = useNavigate()

    const { data: coursePopulate, isLoading } = useCoursePopulate()
    const { data: instructorMonth } = useInstructorMonth()
    const { data: courseFree } = useCourseFree()
    const { data: postFeatured } = useGetFeaturedPosts()
    const { data: courseToday } = useCourseToday()
    const { data: adminPost } = useAdminPost()

    const formatTime = (date: any) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })
    }

    const Star = (star: number) => {
        const stars = [...Array(5)].map((_, index) => {
            const fullStar = index < Math.floor(star)
            const halfStar = index === Math.floor(star) && star % 1 !== 0
            return { fullStar, halfStar }
        })
        return stars
    }


    useEffect(() => {
        const hasSeenAdminPost = localStorage.getItem('hasSeenAdminPost')
        if (!hasSeenAdminPost && adminPost && adminPost.length > 0) {
            setShowAdminPost(true)
            localStorage.setItem('hasSeenAdminPost', 'true')
        }
    }, [adminPost])

    if (isLoading) return <Loading />

    return (
        <div className="grid grid-cols-12 items-start gap-5">
            <div
                className={`card flex flex-col gap-7 ${courseToday && courseToday.length > 0 ? 'md:col-span-7 lg:col-span-9' : 'col-span-12'}`}
            >
                <Carousel
                    className="w-full"
                    opts={{
                        align: 'start'
                    }}
                >
                    <div className="flex justify-between">
                        <h5 className="text-lg font-medium text-black md:text-xl">
                            Người hướng dẫn nổi bật theo tháng
                        </h5>
                        <div className="flex w-20 gap-2 text-right">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full gap-4">
                            {instructorMonth?.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <Teacher
                                        key={index}
                                        id={item.id}
                                        name={item.name}
                                        avatar={item.avatar!}
                                        ratings_avg_rate={item.ratings_avg_rate}
                                        follow={item.follow}
                                        total_courses={item.total_courses}
                                        total_ratings={item.total_ratings}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>

                <Carousel
                    className="w-full"
                    opts={{
                        align: 'start'
                    }}
                >
                    <div className="flex justify-between">
                        <h5 className="text-lg font-medium text-black md:text-xl">Khoá học nổi bật theo tháng</h5>
                        <div className="flex w-20 gap-2 text-right">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full gap-4">
                            {coursePopulate &&
                                coursePopulate.length > 0 &&
                                coursePopulate?.map((item, index) => (
                                    <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                        <Course data={item} page={routes.courseDetail} />
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                    </div>
                </Carousel>
                {courseFree && courseFree.length > 0 ? (
                    <Carousel
                        className="w-full"
                        opts={{
                            align: 'start'
                        }}
                    >
                        <div className="flex justify-between">
                            <h5 className="text-lg font-medium text-black md:text-xl">Khoá học miễn phí</h5>
                            <div className="flex w-20 gap-2 text-right">
                                <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                <CarouselNext className="!translate-y-0 !shadow-none" />
                            </div>
                        </div>
                        <div className="w-full">
                            <CarouselContent className="w-full gap-4">
                                {courseFree &&
                                    courseFree.length > 0 &&
                                    courseFree?.map((item, index) => (
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
                ) : (
                    ''
                )}
                {postFeatured && postFeatured.length > 0 ? (
                    <Carousel
                        className="w-full"
                        opts={{
                            align: 'start'
                        }}
                    >
                        <div className="flex justify-between">
                            <h5 className="text-lg font-medium text-black md:text-xl">Bài viết nổi bật</h5>
                            <div className="flex w-20 gap-2 text-right">
                                <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                <CarouselNext className="!translate-y-0 !shadow-none" />
                            </div>
                        </div>
                        <div className="w-full">
                            <CarouselContent className="w-full gap-4">
                                {postFeatured &&
                                    postFeatured.length > 0 &&
                                    postFeatured?.map((post, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="w-full min-w-0 basis-full md:basis-[367px]"
                                        >
                                            <PostOutStanding
                                                image={post.thumbnail}
                                                title={post.title}
                                                avatar={post.avatar}
                                                name={post.name}
                                                slug={post.slug}
                                                views={post.views}
                                                content={post.content}
                                            />
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                ) : (
                    ''
                )}
            </div>
            {courseToday && courseToday.length > 0 && (
                <div className="card col-span-12 w-full md:col-span-5 lg:col-span-3">
                    <Carousel
                        className="w-full"
                        opts={{
                            align: 'start'
                        }}
                    >
                        <div className="flex justify-between">
                            <h5 className="text-xl font-medium text-black">Hôm nay</h5>
                            <div className="flex gap-2">
                                <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                <CarouselNext className="!translate-y-0 !shadow-none" />
                            </div>
                        </div>
                        <div className="w-full gap-0">
                            <CarouselContent className="!m-0 w-full !py-0">
                                {courseToday &&
                                    courseToday?.map((item, index) => (
                                        <CarouselItem key={index} className="w-full min-w-0 basis-full !p-0">
                                            <div className="card flex w-full cursor-text flex-col gap-3 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[300px]">
                                                <Link
                                                    to={routes.courseDetail.replace(':slug', item.slug)}
                                                    className="flex flex-col gap-2"
                                                >
                                                    <div className="relative h-[140px] flex-shrink-0 cursor-pointer">
                                                        <img
                                                            src={getImagesUrl(item.thumbnail!)}
                                                            alt={item.name}
                                                            className="h-full w-full rounded-lg object-cover"
                                                        />
                                                        <div className="absolute bottom-2.5 left-2.5">
                                                            <CourseLevel courseLevel={item.level!} />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-overflow cursor-pointer text-base font-bold text-black md:text-lg">{item.name}</h3>
                                                </Link>
                                                <div className="flex flex-col gap-2.5">
                                                    <div>
                                                        {item?.price > 0 || item?.price_sale > 0 ? (
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center gap-1">
                                                                    {item?.price_sale > 0 ? (
                                                                        <div className="flex items-center gap-1">
                                                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                                                            <del className="font-semibold text-red-600">{Math.floor(item?.price)}</del>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="flex items-center gap-1">
                                                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                                                            <p className="text-base font-semibold text-red-600">
                                                                                {Math.floor(item?.price)}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {item?.price_sale > 0 && (
                                                                    <div className="flex items-center gap-1">
                                                                        <TbCoinFilled className="size-5 text-yellow-500" />
                                                                        <p className="text-base font-semibold text-red-600">
                                                                            {Math.floor(item?.price_sale)}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className="text-base font-semibold text-orange-500">Miễn phí</span>
                                                        )}
                                                    </div>

                                                    <div
                                                        onClick={() => navigate(routes.instructorDetail.replace(':id', String(item.id_user)))}
                                                        className={`flex ${!item.is_course_bought ? 'mt-2.5' : ''} cursor-pointer`}
                                                    >
                                                        {item.user && (
                                                            <div className="flex w-fit items-center gap-2">
                                                                <Avatar className="size-8 flex-shrink-0">
                                                                    <AvatarImage src={getImagesUrl(item.user?.avatar || '')} alt={item.user.name} />
                                                                    <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                                                        {item.user.name.charAt(0)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <p className="flex-1">{item.user.name}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="ml-1 font-semibold">
                                                            {(Number(item.ratings_avg_rate) % 1 === 0
                                                                ? Math.floor(Number(item.ratings_avg_rate))
                                                                : Number(item.ratings_avg_rate).toFixed(1)) || '0'}
                                                        </span>

                                                        {Star(item.ratings_avg_rate!).map((star, starIndex) => (
                                                            <div key={starIndex} className="relative">
                                                                <IoMdStar className="size-4 text-gray-300" />
                                                                {star.fullStar && <IoMdStar className="absolute left-0 top-0 size-4 text-primary" />}
                                                                {star.halfStar && (
                                                                    <IoMdStar
                                                                        className="absolute left-0 top-0 size-4 text-primary"
                                                                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                                                                    />
                                                                )}
                                                            </div>
                                                        ))}
                                                        <span className="ml-1 font-medium text-darkGrey">({item.ratings_count} đánh giá)</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5">
                                                            <FaRegUser className="size-5 text-darkGrey" />
                                                            <p className="font-medium text-black">{item.total_student}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <FaRegCirclePlay className="size-5 text-darkGrey" />
                                                            <p className="font-medium text-black">{item.total_lessons}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <IoTimeOutline className="size-5 text-darkGrey" />
                                                            <p className="font-medium text-black">{formatDuration((item?.total_duration_video as unknown as number) || 0)}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                </div>
            )}
            <Dialog open={showAdminPost} onOpenChange={(isOpen) => setShowAdminPost(isOpen)}>
                <DialogContent className="flex max-h-[80vh] max-w-5xl flex-col gap-6 overflow-auto p-8">
                    {adminPost &&
                        adminPost.length > 0 &&
                        adminPost.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-2 ${adminPost.length > 1 ? 'border-b pb-2' : ''}`}
                            >
                                <h2 className="flex items-center gap-2 text-lg font-semibold">
                                    <span className="text-primary">#</span>
                                    {item.title}
                                </h2>
                                <div dangerouslySetInnerHTML={{ __html: item?.content || '' }} />
                                <p className="text-darkGrey">
                                    Đăng bởi{' '}
                                    <span className="text- inline-block font-semibold italic text-primary">
                                        {item.user.name}
                                        <FaCheckCircle className="ms-2 inline size-3 text-primary" />
                                    </span>{' '}
                                    - {formatTime(item.created_at)}
                                </p>
                            </div>
                        ))}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard
