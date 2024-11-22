import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useCourseRelated } from '@/app/hooks/courses/useCourse'
import Course from '@/components/shared/Course'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import routes from '@/configs/routes'

const CourseRelated = () => {
    const slug = useGetSlugParams('slug')
    const { data } = useCourseRelated(slug!)
    return (
        <>
            {data && data.length > 0 ? (
                <div className="card col-span-12 flex w-full flex-1 flex-col gap-7 md:col-span-7 lg:col-span-9">
                    <Carousel
                        className="w-full"
                        opts={{
                            align: 'start'
                        }}
                    >
                        <div className="flex justify-between">
                            <h5 className="text-lg font-medium text-black md:text-xl">Khoá học liên quan</h5>
                            <div className="flex w-20 gap-2 text-right">
                                <CarouselPrevious className="!translate-y-0 !shadow-none" />
                                <CarouselNext className="!translate-y-0 !shadow-none" />
                            </div>
                        </div>
                        <div className="w-full">
                            <CarouselContent className="w-full gap-4">
                                {data &&
                                    data.length > 0 &&
                                    data?.map((item, index) => (
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
            ) : ''}
        </>
    )
}

export default CourseRelated
