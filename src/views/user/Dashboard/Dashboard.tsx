import routes from '@/configs/routes'
import Course from '@/components/shared/Course'
import Loading from '@/components/Common/Loading/Loading'
import Teacher from '@/components/shared/Teacher'
import { useCoursePopulate } from '@/app/hooks/courses/useCourse'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import CourseToday from '@/components/shared/Course/CourseToday'
import { useInstructorMonth } from '@/app/hooks/instructors'

const Dashboard = () => {
    const { data: coursePopulate, isLoading } = useCoursePopulate()
    const { data: instructorMonth } = useInstructorMonth()

    if (isLoading) return <Loading />

    return (
        <div className="grid grid-cols-12 items-start gap-5">
            <div className="card col-span-12 flex flex-1 flex-col gap-7 md:col-span-7 lg:col-span-9">
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
                            {coursePopulate?.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <Course data={item} page={routes.courseDetail} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
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
                            {coursePopulate?.slice(0, 2).map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full !p-0">
                                    <CourseToday
                                        id={item?.id!}
                                        total_student={item?.total_student!}
                                        total_lessons={item?.total_lessons!}
                                        total_duration_video={item?.total_duration_video!}
                                        price_sale={item?.price_sale!}
                                        name={item?.name!}
                                        slug={item?.slug!}
                                        user={item?.user!}
                                        thumbnail={item?.thumbnail!}
                                        price={item?.price!}
                                        level={item?.level!}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Dashboard
