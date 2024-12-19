import { AiFillStar } from 'react-icons/ai'
import bannerImage from '@/assets/banner.png'
import Course from '@/components/shared/Course'
import routes from '@/configs/routes'
import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import { useGetRatingHome } from '@/app/hooks/ratings/useRating'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCourseCategoryHome, useCourseSaleHome } from '@/app/hooks/courses/useCourse'
import { useGetFeaturedPosts } from '@/app/hooks/posts'
import Banners from '@/components/shared/Banner/Banners'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useNavigate } from 'react-router-dom'
import { getImagesUrl } from '@/lib'
import HomePosts from '@/components/shared/Post/HomePosts'
import { useEffect } from 'react'

const Home = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        const user = localStorage.getItem('user_data')

        console.log(user)

        if (accessToken && user) {
            navigate(routes.userDashboard)
        }
    }, [navigate])
    
    const { data: ratings, isLoading: loadingRating } = useGetRatingHome()

    const { data: course_sales, isLoading: loadingSaleHome } = useCourseSaleHome()
    const { data: course_category = [], isLoading: loadingCourseCategory } = useCourseCategoryHome()
    const { data: postFeatured } = useGetFeaturedPosts()

    if (loadingRating || loadingSaleHome || loadingCourseCategory) return <Loading />

    return (
        <div>
            <Banners />

            <div className='mx-auto flex max-w-[1200px] flex-wrap gap-8 px-5 lg:px-0'>
                <Carousel className="w-full" opts={{ align: 'start' }}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 px-5 py-5 lg:px-0">
                            <h3 className="text-xl font-semibold md:text-2xl">Khóa học giảm giá</h3>
                        </div>
                        <div className="flex w-20 gap-2 text-right">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full gap-10">
                            {course_sales?.map((item, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <Course key={index} data={item} page={routes.courseDetailNoLogin} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <div className="mx-auto max-w-[1200px] py-10 lg:px-0">
                <h3 className="text-xl font-semibold md:text-2xl">Khóa học theo danh mục</h3>
                <Tabs defaultValue={course_category[0]?.name} className="container-main flex-col">
                    <TabsList className="scrollbar-hide flex w-full items-start justify-start gap-2 overflow-x-auto">
                        {course_category.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.name}
                                className="min-w-max shrink-0 px-4 py-2 text-base"
                            >
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="p-4">
                        {course_category.map((category) => (
                            <TabsContent key={category.id} value={category.name} className="flex flex-col gap-5">
                                {category.courses && category.courses.length > 0 && <Carousel className="w-full" opts={{ align: 'start' }}>
                                    <div className="w-full">
                                        <CarouselContent className="w-full gap-8">
                                            {category.courses?.map((item, index) => (
                                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                                    <Course key={index} data={item} page={routes.courseDetailNoLogin} />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </div>
                                </Carousel>}

                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
            {postFeatured && postFeatured.length > 0 ? <div className="container-main pb-10">
                <Carousel className="w-full" opts={{ align: 'start' }}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold md:text-2xl">Bài viết nổi bật</h3>
                        <div className="flex w-20 gap-2 text-right">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full gap-4">
                            {postFeatured && postFeatured.length > 0 && postFeatured?.map((post, index) => (
                                <CarouselItem key={index} className="w-full min-w-0 basis-full md:basis-[367px]">
                                    <HomePosts
                                        key={index}
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
            </div> : ''}

            {ratings && ratings.length > 0 ? <div className="container-main pb-10">
                <Carousel className="w-full" opts={{ align: 'start' }}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium md:text-2xl">Đánh giá</h3>
                        <div className="flex w-20 gap-2 text-right">
                            <CarouselPrevious className="!translate-y-0 !shadow-none" />
                            <CarouselNext className="!translate-y-0 !shadow-none" />
                        </div>
                    </div>
                    <div className="w-full">
                        <CarouselContent className="w-full gap-4 px-5">
                            {ratings?.map((item, index) => (
                                <div key={index} className="w-full rounded-lg border bg-white px-7 py-3 md:max-w-[354px]">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="size-10 flex-shrink-0">
                                            <AvatarImage src={getImagesUrl(item?.user?.avatar || '')} alt={item?.user.name} />
                                            <AvatarFallback className="flex size-10 items-center justify-center bg-slate-500/50 font-semibold">
                                                {item?.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item?.user.name}</h4>

                                        </div>
                                    </div>
                                    <div className="pt-3 flex flex-col gap-2">
                                        <div className='w-full flex justify-between'>
                                            <h3 className='font-semibold cursor-pointer' onClick={() => navigate(routes.courseDetailNoLogin.replace(':slug', item.course.slug))} >{item?.course?.name}</h3>
                                            <div className="flex gap-1.5">
                                                <p className='font-medium'>{item.rate}</p>
                                                <AiFillStar key={index} className="h-5 w-5 text-primary" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600">{item.content}</p>
                                    </div>
                                </div>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div> : ''}

            <div className="container-main rounded-md pb-10">
                <div
                    className="relative h-[250px] w-full overflow-hidden rounded-md bg-cover bg-center md:h-[350px] lg:h-[419px]"
                    style={{
                        backgroundImage: `url(${bannerImage})`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-300 to-transparent"></div>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 text-center text-white">
                        <h1 className="mb-4 text-xl font-semibold md:text-3xl lg:text-5xl">
                            Trở thành giảng viên ngay
                        </h1>
                        <Button onClick={() => navigate(routes.login)}>Tham gia ngay</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
