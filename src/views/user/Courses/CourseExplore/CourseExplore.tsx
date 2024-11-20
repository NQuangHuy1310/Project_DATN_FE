import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { useCoursePopulate } from '@/app/hooks/courses/useCourse'
import Loading from '@/components/Common/Loading/Loading'
import Course from '@/components/shared/Course'
import routes from '@/configs/routes'
import { useInstructorMonth } from '@/app/hooks/instructors'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const CoursesExplore = () => {
    const { data: coursePopulate, isLoading } = useCoursePopulate()
    const { data: instructorMonth } = useInstructorMonth()

    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-8">
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <Carousel className="w-full" opts={{ align: 'start' }}>
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
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-black">Khoá học hàng tháng nổi bật</h2>
                <div className="flex flex-wrap gap-10">
                    {coursePopulate &&
                        coursePopulate.length > 0 &&
                        coursePopulate.map((item, index) => (
                            <Course data={item} key={index} page={routes.courseDetail} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CoursesExplore
