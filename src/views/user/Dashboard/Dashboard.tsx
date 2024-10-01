import Course from '@/components/shared/Course'
import Teacher from '@/components/shared/Teacher'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { courses, coursesToday, mockTeachers } from '@/constants/mockData'

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 items-start gap-5">
            <div className="card col-span-12 flex flex-1 flex-col gap-7 md:col-span-8">
                <Carousel
                    className="w-full"
                    opts={{
                        align: 'start'
                    }}
                >
                    <div className="flex justify-between">
                        <h5 className="text-xl font-medium text-black">Người hướng dẫn nổi bật theo tháng</h5>
                        <div>
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full">
                            {mockTeachers.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-[367px]">
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
                        <h5 className="text-xl font-medium text-black">Khoá học nổi bật theo tháng</h5>
                        <div className="flex gap-2">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full">
                            {courses.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-[367px]">
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
            <div className="card col-span-12 w-full md:col-span-4">
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
                    <div className="w-full">
                        <CarouselContent className="!m-0 w-full !py-0">
                            {coursesToday.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full !p-0">
                                    <Course
                                        key={index}
                                        name={item.name}
                                        image={item.image}
                                        createdBy={item.createdBy}
                                        level={item.level}
                                        star={item.star}
                                        module={item.module}
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
