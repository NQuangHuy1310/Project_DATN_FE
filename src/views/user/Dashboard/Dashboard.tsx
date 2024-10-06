import Course from '@/components/shared/Course'
import CourseToday from '@/components/shared/Course/CourseToday'
import Teacher from '@/components/shared/Teacher'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { courses, coursesToday, mockTeachers } from '@/constants/mockData'

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 items-start gap-5">
            <div className="card col-span-12 flex flex-1 flex-col gap-7 md:col-span-7 lg:col-span-8">
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
                            {mockTeachers.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <Teacher
                                        key={index}
                                        name={item.name}
                                        image={item.image}
                                        job={item.job}
                                        reviewStart={item.reviewStart}
                                        status={item.status}
                                        totalCourse={item.totalCourse}
                                        totalReview={item.totalReview}
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
                            {courses.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <Course
                                        key={index}
                                        name={item.name}
                                        image={item.image}
                                        createdBy={item.createdBy}
                                        level={item.level}
                                        star={item.star}
                                        totalTime={item.totalTime}
                                        studentCount={item.studentCount}
                                        totalVideo={item.totalVideo}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <div className="card col-span-12 w-full md:col-span-5 lg:col-span-4">
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
                            {coursesToday.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full !p-0">
                                    <CourseToday
                                        key={index}
                                        name={item.name}
                                        image={item.image}
                                        createdBy={item.createdBy}
                                        level={item.level}
                                        star={item.star}
                                        module={item.module}
                                        studentCount={item.studentCount}
                                        totalTime={item.totalTime}
                                        totalVideo={item.totalVideo}
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
