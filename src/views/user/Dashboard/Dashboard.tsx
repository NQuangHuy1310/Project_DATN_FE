import routes from '@/configs/routes'
import Course from '@/components/shared/Course'
import Loading from '@/components/Common/Loading/Loading'
import Teacher from '@/components/shared/Teacher'
import { useCourseFree, useCoursePopulate, useCourseToday } from '@/app/hooks/courses/useCourse'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useInstructorMonth } from '@/app/hooks/instructors'
import { useGetFeaturedPosts } from '@/app/hooks/posts'
import PostOutStanding from '@/components/shared/Post/PostOutStanding'

const Dashboard = () => {
    const { data: coursePopulate, isLoading } = useCoursePopulate()
    const { data: instructorMonth } = useInstructorMonth()
    const { data: courseFree } = useCourseFree()
    const { data: postFeatured } = useGetFeaturedPosts()
    const { data: courseToday } = useCourseToday()

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
                                            <Course data={item} key={index} />
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                        </div>
                    </Carousel>
                </div>
            )}
        </div>
    )
}

export default Dashboard
