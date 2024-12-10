import { useGetBanners } from '@/app/hooks/others'
import Loading from '@/components/Common/Loading/Loading'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { getImagesUrl } from '@/lib'
import Banner from '@/assets/homeBanner.png'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes'
const Banners = () => {
    const navigate = useNavigate()
    const { data: banners, isLoading: loadingBanner } = useGetBanners()
    if (loadingBanner) return <Loading />
    return (
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
                                        <Button onClick={() => navigate(routes.login)} className="border border-white px-8 py-[19px]">Đăng ký ngay</Button>
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
                            <Button onClick={() => navigate(routes.login)} className="border border-white px-8 py-[19px]">Đăng ký ngay</Button>
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

    )
}

export default Banners
