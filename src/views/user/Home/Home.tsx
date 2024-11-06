import { AiFillStar } from 'react-icons/ai'

import Banner from '@/assets/homeBanner.png'
import bannerImage from '@/assets/banner.png'

import Course from '@/components/shared/Course'
import routes from '@/configs/routes'
import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import CountdownTime from '@/components/shared/CountDownTime'
import { getImagesUrl } from '@/lib'
import { useGetBanners } from '@/app/hooks/others/useOthers'
import { useGetRatingHome } from '@/app/hooks/ratings/useRating'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCourseCategoryHome, useCourseSaleHome } from '@/app/hooks/courses/useCourse'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BsDot } from 'react-icons/bs'

const Home = () => {
    const { data: ratings, isLoading: loadingRating } = useGetRatingHome()
    const { data: course_sales, isLoading: loadingSaleHome } = useCourseSaleHome()
    const { data: course_category = [], isLoading: loadingCourseCategory } = useCourseCategoryHome()
    const { data: banners, isLoading: loadingBanner } = useGetBanners()

    if (loadingRating || loadingSaleHome || loadingCourseCategory || loadingBanner) return <Loading />

    return (
        <div>
            <div className="bg-softGrey">
                {banners && banners.length > 0 ? (
                    <Carousel className="container-main relative w-full px-5">
                        <CarouselContent>
                            {banners?.map((banner) => (
                                <CarouselItem
                                    key={banner.id}
                                    className="mx-auto flex max-w-[1200px] flex-col-reverse flex-wrap items-center justify-between gap-y-5 px-5 py-5 lg:flex-row lg:flex-nowrap lg:px-0"
                                >
                                    <div className="mx-auto flex max-w-full flex-col gap-2 px-6 lg:max-w-[540px] lg:gap-6">
                                        <h1 className="text-2xl font-semibold md:text-[30px] lg:text-[40px] lg:leading-[60px]">
                                            {banner.title}
                                        </h1>
                                        <p className="text-xs md:text-sm lg:text-base">{banner.content}</p>
                                        <div className="flex items-center gap-4">
                                            <Button className="border border-white px-8 py-[19px]">Đăng ký ngay</Button>
                                        </div>
                                    </div>
                                    <div className="px-5 lg:px-0">
                                        <img
                                            src={getImagesUrl(banner.image)}
                                            className="max-h-[400px] w-full max-w-[550px] rounded-md lg:max-h-[450px]"
                                            alt="Coursea"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
                    </Carousel>
                ) : (
                    <div className="mx-auto flex max-w-[1200px] flex-col-reverse flex-wrap items-center justify-between gap-y-5 px-5 py-5 lg:flex-row lg:flex-nowrap lg:px-0">
                        <div className="mx-auto flex max-w-full flex-col gap-2 px-6 lg:max-w-[540px] lg:gap-6">
                            <h1 className="text-2xl font-semibold md:text-[30px] lg:text-[40px] lg:leading-[60px]">
                                Tham gia ngay – Ưu đãi đặc biệt cho học viên mới!
                            </h1>
                            <p className="text-xs md:text-sm lg:text-base">
                                Giảm ngay 50% cho khóa học đầu tiên khi đăng ký trong hôm nay. Cơ hội duy nhất để trải
                                nghiệm hệ thống học trực tuyến hàng đầu với mức giá ưu đãi nhất!Hãy bắt đầu hành trình
                                học tập của bạn cùng chúng tôi ngay bây giờ.
                            </p>
                            <div className="flex items-center gap-4">
                                <Button className="border border-white px-8 py-[19px]">Đăng ký ngay</Button>
                            </div>
                        </div>
                        <div className="px-5 lg:px-0">
                            <img
                                src={Banner}
                                className="max-h-[400px] w-full max-w-[550px] rounded-md lg:max-h-[450px]"
                                alt="Coursea"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-5 py-9 lg:px-0">
                <h2 className="text-xl font-medium">Khóa học giảm giá</h2>
                <CountdownTime hours={1} minutes={24} seconds={1} />
            </div>
            <div className="mx-auto flex max-w-[1200px] flex-wrap gap-8 px-5 lg:px-0">
                {course_sales?.map((item, index) => (
                    <Course key={index} data={item} page={routes.courseDetailNoLogin} />
                ))}
            </div>

            <Tabs defaultValue={course_category[0]?.name} className="container-main flex-col py-10">
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
                            <div className="flex flex-col gap-5">
                                <h3 className="text-xl font-medium">{category.name}</h3>
                                <p className="text-sm">{category.description || 'Không có mô tả'}</p>
                            </div>
                            <div className="flex flex-wrap gap-8">
                                {category.courses.length > 0 ? (
                                    category.courses.map((course, index) => {
                                        return <Course data={course} key={index} page={routes.courseDetailNoLogin} />
                                    })
                                ) : (
                                    <p>Không có khóa học nào</p>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </div>
            </Tabs>

            <div className="container-main pb-10">
                <h3 className="pb-7 text-xl font-medium md:text-2xl">Bài viết nổi bật</h3>

                <div className="flex w-full max-w-[360px] cursor-pointer flex-col gap-4 rounded-lg border p-4 shadow-md">
                    <div className="h-[170px] w-full overflow-hidden rounded-lg">
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            {' '}
                            <h3 className="truncate text-lg font-semibold">
                                Tổng hợp các sản phẩm của học viên tại F8
                            </h3>
                        </div>
                        <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://artena.vn/wp-content/uploads/2024/10/anh-meme-cute-hai-huoc-15.jpg"
                                    alt=""
                                    className="h-10 w-10 rounded-full"
                                />
                                <span className="text-xs font-semibold">Lê Thị Thùy Linh</span>
                            </div>
                            <div className="gap flex items-center">
                                <BsDot className="text-darkGrey" />
                                <span className="text-darkGrey">6 phút đọc</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-main pb-10">
                <h3 className="pb-7 text-xl font-medium md:text-2xl">Đánh giá</h3>
                <div className="flex flex-wrap gap-3">
                    {ratings?.map((item, index) => (
                        <div key={index} className="w-full rounded-lg border bg-white px-7 py-3 md:max-w-[354px]">
                            <div className="flex space-x-4">
                                <Avatar className="size-10 flex-shrink-0">
                                    <AvatarImage src={item?.user_avatar || ''} alt={item.user_name} />
                                    <AvatarFallback className="flex size-10 items-center justify-center bg-slate-500/50 font-semibold">
                                        {item.user_name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-gray-800">{item.user_name}</h4>
                                    <p className="text-[9px] text-gray-500">{item.created_at}</p>

                                    <div className="flex space-x-1">
                                        {Array(item.rate)
                                            .fill(0)
                                            .map((_, index) => (
                                                <AiFillStar key={index} className="h-5 w-5 text-yellow-500" />
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3">
                                <p className="text-xs text-gray-600">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                        <Button className="">Đăng kí ngay</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
