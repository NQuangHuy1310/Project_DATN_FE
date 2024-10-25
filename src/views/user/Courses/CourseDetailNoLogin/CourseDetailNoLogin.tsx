import { useState } from 'react'

import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { CourseLevel as CourseLevelType } from '@/constants'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import routes from '@/configs/routes'
import About from '@/views/user/Courses/CourseDetail/About'
import Assignment from '@/views/user/Courses/CourseDetail/Assignment'
import Reviews from '@/views/user/Courses/CourseDetail/Reviews'
import Tools from '@/views/user/Courses/CourseDetail/Tools'
import CourseToday from '@/components/shared/Course/CourseToday'
import { useCourseDetailNoLoginBySlug } from '@/app/hooks/courses/useCourse'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { formatDuration, getImagesUrl } from '@/lib/common'
import Loading from '@/components/Common/Loading/Loading'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

const CourseDetailNoLogin = () => {
    const [toggleCourse, setToggleCourse] = useState<boolean>(false)

    const handleToggleCourse = () => setToggleCourse(!toggleCourse)

    const slug = useGetSlugParams('slug')

    const { data: courseDetail, isLoading } = useCourseDetailNoLoginBySlug(slug!)

    const totalTime = formatDuration((courseDetail?.total_duration_vid as unknown as number) || 0)

    if (isLoading) return <Loading />

    return (
        <div className="">
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
                        <BreadcrumbLink href="">{courseDetail?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex w-full flex-wrap justify-between gap-5">
                <div className="card flex w-full flex-1 flex-col gap-6 lg:max-w-[805px]">
                    <div className="h-[300px] w-full md:h-[400px] lg:h-[440px]">
                        <video
                            src={getImagesUrl(courseDetail?.trailer || '')}
                            title="YouTube video player"
                            className="h-full w-full rounded-lg"
                            controls
                            autoPlay
                        ></video>
                    </div>
                    <div className="flex flex-col gap-7 px-2">
                        <div className="flex flex-col gap-5">
                            <h4 className="text-lg font-bold md:text-xl lg:text-2xl">{courseDetail?.name}</h4>

                            <div className="flex flex-wrap items-center justify-between gap-5">
                                <div className="flex gap-5">
                                    <div className="flex items-center gap-2.5">
                                        <Avatar className="size-8">
                                            <AvatarImage
                                                src={getImagesUrl(courseDetail?.user.avatar || '')}
                                                alt={courseDetail?.user.name}
                                                className="h-full w-full object-cover"
                                            />
                                            <AvatarFallback>{courseDetail?.user?.name?.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <h6 className="md:text-base">{courseDetail?.user.name}</h6>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoIosStar className="size-5 text-primary" />
                                        <span> 4,5 (500 Reviews)</span>
                                    </div>
                                </div>
                                <Button className="bg-transparent text-primary hover:text-primary/80" variant="outline">
                                    + Theo dõi
                                </Button>
                                <div className="block md:hidden">
                                    <CourseLevel courseLevel={courseDetail?.level || ''} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex w-full items-center justify-between gap-5 md:w-auto">
                                    <div className="flex items-center gap-1.5">
                                        <FaRegUser className="size-4 text-darkGrey" />
                                        <p className="text-xs font-medium text-black md:text-base">
                                            {courseDetail?.total_student} học sinh
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaRegCirclePlay className="size-4 text-darkGrey" />
                                        <p className="text-xs font-medium text-black md:text-base">
                                            Tổng số {courseDetail?.total_lessons} bài giảng
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
                                <TabsTrigger value="tool" className="min-w-max shrink-0 px-4 py-2">
                                    Công cụ
                                </TabsTrigger>
                                <TabsTrigger value="review" className="min-w-max shrink-0 px-4 py-2">
                                    Đánh giá
                                </TabsTrigger>
                            </TabsList>

                            <div className="p-4">
                                <TabsContent value="about">
                                    <About
                                        goals={courseDetail?.goals || []}
                                        description={courseDetail?.description || ''}
                                        requirements={courseDetail?.requirements || []}
                                    />
                                </TabsContent>

                                <TabsContent value="assignment">
                                    <Assignment />
                                </TabsContent>

                                <TabsContent value="tool">
                                    <Tools />
                                </TabsContent>

                                <TabsContent value="review">
                                    <Reviews />
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>

                <div className="w-full max-w-[360px]">
                    <div className="hidden w-full flex-shrink-0 transition-transform duration-500 lg:block">
                        <CourseToday
                            total_student={courseDetail?.total_student}
                            page={routes.courseDetail}
                            totalLesson={courseDetail?.total_lessons}
                            totalTime={courseDetail?.total_duration}
                            price_sale={courseDetail?.price_sale || 0}
                            course_name={courseDetail?.name || ''}
                            module={courseDetail?.modules || []}
                            course_slug={courseDetail?.slug || ''}
                            user={courseDetail?.user}
                            course_thumbnail={courseDetail?.thumbnail || ''}
                            price={courseDetail?.price || 0}
                            level={courseDetail?.level || ''}
                        />
                    </div>
                    <div className="card flex w-full flex-col gap-4 lg:hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">{courseDetail?.modules.length}</span>
                        </div>
                        <Button onClick={handleToggleCourse}>Tham gia khoá học</Button>
                    </div>

                    {toggleCourse && (
                        <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleToggleCourse} />
                    )}

                    <div
                        className={`fixed inset-x-0 bottom-0 z-50 w-full bg-white transition-transform duration-500 ease-in-out lg:hidden ${toggleCourse ? 'translate-y-0' : 'translate-y-full'}`}
                    >
                        <CourseToday
                            total_student={courseDetail?.total_student}
                            page={routes.courseDetail}
                            totalLesson={courseDetail?.total_lessons}
                            totalTime={courseDetail?.total_duration}
                            price_sale={courseDetail?.price_sale || 0}
                            course_name={courseDetail?.name || ''}
                            module={courseDetail?.modules || []}
                            course_slug={courseDetail?.slug || ''}
                            user={courseDetail?.user}
                            course_thumbnail={courseDetail?.thumbnail || ''}
                            price={courseDetail?.price || 0}
                            level={courseDetail?.level || ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailNoLogin
