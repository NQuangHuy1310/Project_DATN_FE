import { useState } from 'react'

import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import About from '@/views/user/Courses/CourseDetail/About'
import routes from '@/configs/routes'
import Reviews from '@/views/user/Courses/CourseDetail/Reviews'
import Loading from '@/components/Common/Loading/Loading'
import Content from '@/views/user/Courses/CourseDetail/Content.tsx'
import { Button } from '@/components/ui/button'
import CourseToday from '@/components/shared/Course/CourseToday'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useCourseDetailNoLoginBySlug } from '@/app/hooks/courses/useCourse'
import { formatDuration, getImagesUrl } from '@/lib/common'
import { CourseLevel as CourseLevelType } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const CourseDetailNoLogin = () => {
    const slug = useGetSlugParams('slug')
    const [toggleCourse, setToggleCourse] = useState<boolean>(false)

    const { data: courseDetail, isLoading } = useCourseDetailNoLoginBySlug(slug!)
    const course = courseDetail?.course
    const ratings = courseDetail?.ratings
    const handleToggleCourse = () => setToggleCourse(!toggleCourse)
    const totalTime = formatDuration((course?.total_duration_video as unknown as number) || 0)

    if (isLoading) return <Loading />

    return (
        <div className="bg-softGrey pb-10">
            <div className="container-main">
                <Breadcrumb className="py-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={routes.home}>Trang chủ</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="">Khoá học</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="">{course?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid w-full grid-cols-12 gap-5">
                    <div className="card col-span-12 flex flex-col gap-5 lg:col-span-8">
                        <div className="h-[300px] w-full md:h-[400px] lg:h-[440px]">
                            <video
                                src={getImagesUrl(course?.trailer || '')}
                                title="YouTube video player"
                                className="h-full w-full rounded-lg"
                                controls
                            ></video>
                        </div>
                        <div className="flex flex-col gap-7 px-2">
                            <div className="flex flex-col gap-5">
                                <h4 className="text-lg font-bold md:text-xl lg:text-2xl">{course?.name}</h4>

                                <div className="flex flex-wrap items-center justify-between gap-5">
                                    <div className="flex gap-5">
                                        <div className="flex items-center gap-2.5">
                                            <Avatar className="size-8">
                                                <AvatarImage
                                                    src={getImagesUrl(course?.user?.avatar || '')}
                                                    alt={course?.user?.name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <AvatarFallback>{course?.user?.name?.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <h6 className="md:text-base">{course?.user?.name}</h6>
                                        </div>
                                        <Button
                                            className="bg-transparent text-primary hover:text-primary/80"
                                            variant="outline"
                                            size="sm"
                                        >
                                            + Theo dõi
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoIosStar className="size-5 text-primary" />
                                        <span>{Math.floor(ratings?.average_rating ?? 0)} ({ratings?.total_reviews} đánh giá)</span>
                                    </div>

                                    <div className="block md:hidden">
                                        <CourseLevel courseLevel={course?.level || ''} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex w-full items-center justify-between gap-5 md:w-auto">
                                        <div className="flex items-center gap-1.5">
                                            <FaRegUser className="size-4 text-darkGrey" />
                                            <p className="text-xs font-medium text-black md:text-base">
                                                {course?.total_student} học sinh
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FaRegCirclePlay className="size-4 text-darkGrey" />
                                            <p className="text-xs font-medium text-black md:text-base">
                                                Tổng số {course?.total_lessons} bài giảng
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <IoTimeOutline className="size-4 text-darkGrey" />
                                            <p className="text-xs font-medium text-black md:text-base">
                                                Thời lượng {totalTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <CourseLevel courseLevel={CourseLevelType.Beginner} />
                                    </div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <Tabs defaultValue="about" className="flex flex-col gap-6">
                                <TabsList className="scrollbar-hide flex w-full items-start justify-start gap-2 overflow-x-auto">
                                    <TabsTrigger value="about" className="min-w-max shrink-0 px-4 py-2">
                                        Thông tin
                                    </TabsTrigger>
                                    <TabsTrigger value="assignment" className="min-w-max shrink-0 px-4 py-2">
                                        Bài tập
                                    </TabsTrigger>
                                    <TabsTrigger value="review" className="min-w-max shrink-0 px-4 py-2">
                                        Đánh giá
                                    </TabsTrigger>
                                </TabsList>

                                <div className="p-4">
                                    <TabsContent value="about">
                                        <About
                                            goals={course?.goals ?? []}
                                            description={course?.description ?? ''}
                                            requirements={course?.requirements ?? []}
                                            audiences={course?.audiences ?? []}
                                        />
                                    </TabsContent>
                                    <TabsContent value="assignment">
                                        <Content modules={course?.modules ?? []} />
                                    </TabsContent>
                                    <TabsContent value="review">
                                        <Reviews />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    <div className="col-span-12 w-full lg:col-span-4">
                        <div className="hidden w-full flex-shrink-0 transition-transform duration-500 lg:block">
                            {courseDetail && (
                                <CourseToday
                                    id={course?.id ?? 0}
                                    total_student={course?.total_student ?? 0}
                                    lessons_count={course?.lessons_count ?? 0}
                                    total_lessons={course?.total_lessons ?? 0}
                                    total_duration_video={course?.total_duration_video ?? 0}
                                    price_sale={course?.price_sale || 0}
                                    name={course?.name || ''}
                                    module={course?.modules || []}
                                    slug={course?.slug || ''}
                                    user={course?.user}
                                    thumbnail={course?.thumbnail || ''}
                                    trailer={course?.trailer}
                                    price={course?.price || 0}
                                    level={course?.level || ''}
                                    page={routes.courseDetailNoLogin || routes.courseDetail}
                                />
                            )}
                        </div>
                        <div className="card flex w-full flex-col gap-4 lg:hidden">
                            <Button onClick={handleToggleCourse}>Tham gia khoá học</Button>
                        </div>

                        {toggleCourse && (
                            <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleToggleCourse} />
                        )}

                        <div
                            className={`fixed inset-x-0 bottom-0 z-50 w-full bg-white transition-transform duration-500 ease-in-out lg:hidden ${toggleCourse ? 'translate-y-0' : 'translate-y-full'}`}
                        >
                            {courseDetail && (
                                <CourseToday
                                    id={course?.id ?? 0}
                                    total_student={course?.total_student ?? 0}
                                    lessons_count={course?.lessons_count}
                                    total_lessons={course?.total_lessons ?? 0}
                                    total_duration_video={course?.total_duration_video ?? 0}
                                    price_sale={course?.price_sale || 0}
                                    name={course?.name || ''}
                                    module={course?.modules || []}
                                    slug={course?.slug || ''}
                                    user={course?.user}
                                    thumbnail={course?.thumbnail || ''}
                                    trailer={course?.trailer}
                                    price={course?.price || 0}
                                    level={course?.level || ''}
                                    page={routes.courseDetailNoLogin || routes.courseDetail}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailNoLogin
