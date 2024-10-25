import { useState } from 'react'
import { Link } from 'react-router-dom'

import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { HiArrowLeft } from 'react-icons/hi'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { CourseLevel as CourseLevelType } from '@/constants'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import routes from '@/configs/routes'
import { coursesToday } from '@/constants/mockData'
import About from '@/views/user/Courses/CourseDetail/About'
import Assignment from '@/views/user/Courses/CourseDetail/Assignment'
import Reviews from '@/views/user/Courses/CourseDetail/Reviews'
import Tools from '@/views/user/Courses/CourseDetail/Tools'
import CourseToday from '@/components/shared/Course/CourseToday'
import { useCourseDetailBySlug } from '@/app/hooks/courses/useCourse'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { getImagesUrl } from '@/lib/common'
import Loading from '@/components/Common/Loading/Loading'

const CourseDetail = () => {
    const [toggleCourse, setToggleCourse] = useState<boolean>(false)

    const handleToggleCourse = () => setToggleCourse(!toggleCourse)

    const slug = useGetSlugParams('slug')

    const { data: courseDetail = [], isLoading } = useCourseDetailBySlug(slug!)

    console.log(courseDetail)

    if (isLoading) return <Loading />

    return (
        <div className="grid w-full grid-cols-12 gap-5">
            <div className="card col-span-12 flex flex-col gap-5 lg:col-span-8 xl2:col-span-9">
                <Link to={routes.course}>
                    <HiArrowLeft className="size-6" />
                </Link>
                <div className="h-[300px] w-full md:h-[400px] lg:h-[500px]">
                    <video
                        src={getImagesUrl(courseDetail[0]?.trailer)}
                        title="YouTube video player"
                        className="h-full w-full rounded-lg"
                        controls
                    ></video>
                </div>
                <div className="flex flex-col gap-7 px-2">
                    <div className="flex flex-col gap-5">
                        <h4 className="text-lg font-bold md:text-xl lg:text-2xl">{courseDetail[0]?.name}</h4>
                        <div className="flex flex-wrap items-center justify-between gap-5">
                            <div className="flex items-center gap-2.5">
                                <Avatar className="size-8">
                                    <AvatarImage
                                        src={getImagesUrl(courseDetail[0]?.user.avatar || '')}
                                        alt={courseDetail[0].user.name}
                                        className="h-full w-full object-cover"
                                    />
                                    <AvatarFallback>{courseDetail[0].user.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <h6 className="md:text-base">{courseDetail[0].user.name}</h6>
                            </div>
                            <Button className="bg-transparent text-primary hover:text-primary/80" variant="outline">
                                + Follow Mentor
                            </Button>
                            <div className="flex items-center gap-1">
                                <IoIosStar className="size-5 text-primary" />
                                <span> 4,5 (500 Reviews)</span>
                            </div>
                            <div className="block md:hidden">
                                <CourseLevel courseLevel={courseDetail[0]?.level} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex w-full items-center justify-between gap-5 md:w-auto">
                                <div className="flex items-center gap-1.5">
                                    <FaRegUser className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">500 học sinh</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FaRegCirclePlay className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">100 bài giảng</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IoTimeOutline className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">2h30</p>
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
                                    goals={courseDetail[0].goals}
                                    description={courseDetail[0].description}
                                    requirements={courseDetail[0].requirements}
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
            <div className="col-span-12 w-full lg:col-span-4 xl2:col-span-3">
                <div className="hidden w-full flex-shrink-0 transition-transform duration-500 lg:block">
                    <CourseToday
                        total_student={courseDetail[0].total_student}
                        page={routes.courseDetail}
                        totalLesson={courseDetail[0].total_lessons}
                        totalTime={courseDetail[0].total_duration}
                        price_sale={courseDetail[0].price_sale}
                        course_name={courseDetail[0].name}
                        module={courseDetail[0].modules}
                        course_slug={courseDetail[0].slug}
                        user={courseDetail[0].user}
                        course_thumbnail={courseDetail[0].thumbnail}
                        price={courseDetail[0].price}
                        level={courseDetail[0].level}
                    />
                </div>
                <div className="card flex w-full flex-col gap-4 lg:hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">5 Chương</span>
                        <span>0/5 hoàn thành</span>
                    </div>
                    <Button onClick={handleToggleCourse}>Tham gia khóa học</Button>
                </div>

                {toggleCourse && (
                    <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleToggleCourse} />
                )}

                <div
                    className={`fixed inset-x-0 bottom-0 z-50 w-full bg-white transition-transform duration-500 ease-in-out lg:hidden ${toggleCourse ? 'translate-y-0' : 'translate-y-full'}`}
                >
                    <CourseToday page={routes.courseDetail} {...coursesToday[0]} />
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
