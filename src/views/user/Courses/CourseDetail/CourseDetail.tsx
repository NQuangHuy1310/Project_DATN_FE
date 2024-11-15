import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { IoIosStar } from 'react-icons/io'
import { HiArrowLeft } from 'react-icons/hi'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { FaHeart, FaRegHeart, FaRegUser, FaStar } from 'react-icons/fa'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import { toast } from 'sonner'
import routes from '@/configs/routes'
import { formatDuration, getImagesUrl } from '@/lib/common'

import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useCheckRatingUser, useCreateRating } from '@/app/hooks/ratings/useRating.ts'
import {
    useAddWishList,
    useCheckBuyCourse,
    useCourseDetailNoLoginBySlug,
    useRegisterCourse,
    useUnWishList
} from '@/app/hooks/courses/useCourse'

import About from '@/views/user/Courses/CourseDetail/About'
import Reviews from '@/views/user/Courses/CourseDetail/Reviews'
import Content from '@/views/user/Courses/CourseDetail/Content'

import { Button } from '@/components/ui/button'
import Loading from '@/components/Common/Loading/Loading'
import { CourseLevel as level, TeacherStatus } from '@/constants'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IBuyData } from '@/types'
import { useCheckFlowTeacher, useFlowTeacher, useUnFlowTeacher } from '@/app/hooks/accounts/useFlowTeacher'

const CourseDetail = () => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            rate: 0,
            content: ''
        }
    })
    const navigate = useNavigate()
    const slug = useGetSlugParams('slug')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const handleToggleCourse = () => setToggleCourse(!toggleCourse)
    const [toggleCourse, setToggleCourse] = useState<boolean>(false)

    const { user } = useGetUserProfile()
    const { mutateAsync: addRating } = useCreateRating()
    const { data: courseDetail, isLoading: LoadingCourse } = useCourseDetailNoLoginBySlug(slug!)
    const { data: isPurchased } = useCheckBuyCourse(user?.id || 0, courseDetail?.id || 0)
    const { data: checkRating, isLoading: LoadingCheck } = useCheckRatingUser(user?.id || 0, courseDetail?.id || 0)

    const { mutateAsync: registerCourse } = useRegisterCourse()
    const { mutateAsync: flowTeacher } = useFlowTeacher()
    const { mutateAsync: unFlowTeacher } = useUnFlowTeacher()
    const { mutateAsync: addWishList } = useAddWishList()
    const { mutateAsync: unWishList } = useUnWishList()
    const { data: checkFollow } = useCheckFlowTeacher(user?.id!, courseDetail?.user?.id!)

    const totalTime = formatDuration((courseDetail?.total_duration_video as unknown as number) || 0)
    const rating = watch('rate')

    const onSubmit = async (data: any) => {
        if (checkRating?.data?.status === 'pending') {
            toast.error('Bạn chưa hoàn thành khóa học')
        } else if (user?.id) {
            const payload = {
                ...data,
                id_user: user.id,
                id_course: courseDetail?.id
            }
            await addRating(payload)
            setIsOpen(false)
        }
    }

    const handleLearnNow = async () => {
        if (user && courseDetail) {
            const payload: [number, number, IBuyData] = [
                user.id,
                courseDetail.id,
                {
                    total_coin: 0,
                    coin_discount: 0,
                    total_coin_after_discount: 0
                }
            ]
            await registerCourse(payload)
        }
        navigate(routes.myCourses)
    }

    const handleFlowTeacher = async () => {
        if (courseDetail?.user) {
            await flowTeacher([{ following_id: courseDetail?.user?.id! }])
        }
    }

    const handleUnFlowTeacher = async () => {
        if (courseDetail?.user) {
            await unFlowTeacher([{ following_id: courseDetail?.user?.id! }])
        }
    }

    const handleAddWishList = async () => {
        setIsProcessing(true)
        if (courseDetail?.id) {
            await addWishList(courseDetail.id)
            setIsLiked((prev) => !prev)
            setIsProcessing(false)
        }
    }

    const handleUnWishList = async () => {
        setIsProcessing(true)
        if (courseDetail?.id) {
            await unWishList(courseDetail.id)
            setIsLiked(false)
            setIsProcessing(false)
        }
    }

    if (LoadingCheck || LoadingCourse) return <Loading />

    return (
        <div className="grid w-full grid-cols-12 gap-5">
            <div className="card col-span-12 flex flex-col gap-5 lg:col-span-8 xl2:col-span-9">
                <Link to={routes.course}>
                    <HiArrowLeft className="size-6" />
                </Link>
                <div className="h-[300px] w-full md:h-[400px] lg:h-[500px]">
                    <video
                        src={getImagesUrl(courseDetail ? courseDetail.trailer! : '')}
                        title="YouTube video player"
                        className="h-full w-full rounded-lg"
                        controls
                    ></video>
                </div>
                <div className="flex flex-col gap-7 px-2">
                    <div className="flex flex-col gap-5">
                        <h4 className="text-lg font-bold md:text-xl lg:text-2xl">{courseDetail?.name}</h4>

                        <div className="flex flex-wrap items-center justify-between gap-5">
                            <div className="flex items-center gap-5">
                                <div className="flex items-center gap-2.5">
                                    <Avatar className="size-8">
                                        <AvatarImage
                                            src={getImagesUrl(courseDetail?.user?.avatar || '')}
                                            alt={courseDetail?.user?.name}
                                            className="h-full w-full object-cover"
                                        />
                                        <AvatarFallback>{courseDetail?.user?.name?.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <h6 className="whitespace-nowrap md:text-base">{courseDetail?.user?.name}</h6>
                                </div>
                                {checkFollow && checkFollow?.action == 'follow' && (
                                    <Button variant="default" className="w-full py-3" onClick={handleFlowTeacher}>
                                        {TeacherStatus.follow}
                                    </Button>
                                )}
                                {checkFollow && checkFollow?.action == 'unfollow' && (
                                    <Button
                                        variant="outline"
                                        className="w-full py-3 duration-500 hover:bg-red-400 hover:text-white"
                                        onClick={handleUnFlowTeacher}
                                    >
                                        {TeacherStatus.unFollow}
                                    </Button>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <IoIosStar className="size-5 text-primary" />
                                <span> 4,5 (500 Đánh giá)</span>
                            </div>

                            <div className="block md:hidden">
                                <CourseLevel courseLevel={courseDetail?.level || ''} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex w-full items-center justify-between gap-5 md:w-auto">
                                <div className="flex items-center gap-1.5">
                                    <FaRegUser className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">
                                        {courseDetail?.total_student} học sinh
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FaRegCirclePlay className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">
                                        Tổng số {courseDetail?.total_lessons} bài giảng
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IoTimeOutline className="size-4 text-darkGrey" />
                                    <p className="text-xs font-medium text-black md:text-base">
                                        Thời lượng {totalTime}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <CourseLevel courseLevel={courseDetail?.level ?? level.Beginner} />
                            </div>
                        </div>
                    </div>
                    {/* Tabs */}
                    <Tabs defaultValue="about" className="flex flex-col gap-4">
                        <TabsList className="scrollbar-hide flex w-full items-start justify-start gap-2 overflow-x-auto">
                            <TabsTrigger value="about" className="min-w-max shrink-0 px-4 py-2">
                                Thông tin
                            </TabsTrigger>
                            <TabsTrigger value="content" className="min-w-max shrink-0 px-4 py-2">
                                Nội dung
                            </TabsTrigger>
                            <TabsTrigger value="review" className="min-w-max shrink-0 px-4 py-2">
                                Đánh giá
                            </TabsTrigger>
                        </TabsList>
                        <div className="p-4">
                            <TabsContent value="about">
                                <About
                                    goals={courseDetail?.goals ?? []}
                                    description={courseDetail?.description ?? ''}
                                    requirements={courseDetail?.requirements ?? []}
                                    audiences={courseDetail?.audiences ?? []}
                                />
                            </TabsContent>
                            <TabsContent value="content">
                                <Content modules={courseDetail?.modules ?? []} />
                            </TabsContent>
                            <TabsContent value="review">
                                <Reviews idDetailCourse={courseDetail?.id || 0} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
            <div className="sticky top-[80px] col-span-12 h-fit w-full lg:col-span-4 xl2:col-span-3">
                <div className="hidden w-full flex-shrink-0 transition-transform duration-500 lg:block">
                    <div className="card flex w-full max-w-full cursor-text flex-col gap-4 p-4 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all lg:max-w-[360px] xl:max-w-[400px] xl:p-7 2xl:max-w-[400px]">
                        <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                            <img
                                src={getImagesUrl(courseDetail?.thumbnail ?? '')}
                                alt={courseDetail?.name}
                                className="h-full w-full rounded-lg object-cover"
                            />
                            <div className="absolute bottom-2.5 left-2.5">
                                <CourseLevel courseLevel={courseDetail?.level ?? level.Beginner} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-overflow cursor-pointer text-base font-bold text-black xl2:text-lg">
                                {courseDetail?.name}
                            </h3>
                            {courseDetail?.price && courseDetail?.price != 0 ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <RiMoneyDollarCircleFill className="size-4 text-orange-500" />
                                        {courseDetail?.price_sale && courseDetail?.price_sale != 0 ? (
                                            <del>{Math.floor(courseDetail?.price)}</del>
                                        ) : (
                                            <p>{Math.floor(courseDetail?.price)}</p>
                                        )}
                                    </div>
                                    {courseDetail?.price_sale && courseDetail?.price_sale != 0 && (
                                        <p className="font-semibold text-red-600">
                                            {Math.floor(courseDetail?.price_sale)}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <span className="text-orange-500">Miễn phí</span>
                            )}

                            <div className="flex items-center gap-2">
                                <Link to="" className="flex w-full items-center gap-2.5">
                                    <Avatar className="size-8 flex-shrink-0">
                                        <AvatarImage
                                            src={getImagesUrl(user?.avatar as string) || ''}
                                            alt={user?.name}
                                        />
                                        <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                            {user?.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="w-fit text-sm font-medium xl2:text-base">{user?.name}</p>
                                </Link>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <FaRegUser className="size-4 text-darkGrey" />
                                    <p className="font-medium text-black">{courseDetail?.total_student}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <IoTimeOutline className="size-4 text-darkGrey" />
                                    <p className="font-medium text-black">
                                        {courseDetail?.total_duration_video ? totalTime : 0}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FaRegCirclePlay className="size-4 text-darkGrey" />
                                    <p className="font-medium text-black">{courseDetail?.total_lessons}</p>
                                </div>
                            </div>
                        </div>

                        {user?.id !== courseDetail?.id_user && (
                            <div className="w-full">
                                {isPurchased?.status === 'error' ? (
                                    <div className="flex w-full gap-2">
                                        <Button
                                            className="w-full"
                                            onClick={() => navigate(routes.courseLeaning.replace(':slug', slug!))}
                                        >
                                            Vào học
                                        </Button>
                                        {checkRating?.data?.status !== 'pending' && (
                                            <>
                                                {checkRating?.data?.status === 'completed' ? (
                                                    <Button variant="outline" className="w-full" disabled>
                                                        Đã đánh giá
                                                    </Button>
                                                ) : checkRating?.data?.status === 'allow' ? (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => setIsOpen(true)}
                                                    >
                                                        Đánh giá
                                                    </Button>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                ) : (!courseDetail?.price && !courseDetail?.price_sale) ||
                                    (courseDetail?.price == 0 && courseDetail?.price_sale == 0) ? (
                                    <Button
                                        className="block w-full rounded-md bg-primary py-2 text-center text-white"
                                        onClick={handleLearnNow}
                                    >
                                        Đăng ký học
                                    </Button>
                                ) : (
                                    <div className="flex gap-3 items-center">
                                        <Link
                                            className="block w-full rounded-md bg-primary py-2 text-center text-white"
                                            to={routes.payment.replace(':slug', slug!)}
                                        >
                                            Mua khoá học
                                        </Link>
                                        <div className="w-11 h-9 flex justify-center items-center border-2 rounded-md">
                                            {isProcessing ? (
                                                <div className="w-5 h-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                                            ) : isLiked ? (
                                                <FaHeart
                                                    onClick={handleUnWishList}
                                                    className="size-6 rounded-md text-primary cursor-pointer"
                                                />
                                            ) : (
                                                <FaRegHeart
                                                    onClick={handleAddWishList}
                                                    className="size-6 rounded-md cursor-pointer text-darkGrey"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="max-h-[90vh] w-[90vw] max-w-full overflow-y-scroll p-5 md:max-w-[50vw] md:p-10">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h1 className="text-center text-lg font-bold md:text-left md:text-3xl">Đánh giá</h1>
                                    <div className="flex flex-col gap-5">
                                        <span className="text-center text-sm md:text-left md:text-lg">
                                            Bạn có hài lòng với khóa học?
                                        </span>

                                        <div className="flex justify-center gap-2 md:justify-start">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    onClick={() => setValue('rate', star)}
                                                    className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                                        } h-5 w-5 md:h-8 md:w-8`}
                                                />
                                            ))}
                                        </div>

                                        <div className="mx-auto flex w-full flex-col gap-4 md:mx-0">
                                            <h3 className="text-sm md:text-lg">Đánh giá của bạn</h3>
                                            <textarea
                                                {...register('content', { required: 'Vui lòng nhập nội dung' })}
                                                className="w-full resize-none rounded-md border-2 border-gray-300 p-2 md:p-4"
                                                rows={4}
                                                placeholder="Viết đánh giá của bạn ở đây..."
                                            />
                                            {errors.content && (
                                                <span className="text-red-500">{errors.content.message}</span>
                                            )}
                                        </div>

                                        <div className="flex justify-center md:justify-start">
                                            <DialogFooter>
                                                <Button type="submit">Gửi đánh giá</Button>
                                            </DialogFooter>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                    {courseDetail && (
                        <div className="card flex w-full max-w-full cursor-text flex-col gap-4 p-4 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all lg:max-w-[360px] xl:max-w-[400px] xl:p-7 2xl:max-w-[400px]">
                            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                                <img
                                    src={getImagesUrl(courseDetail?.thumbnail ?? '')}
                                    alt={courseDetail?.name}
                                    className="h-full w-full rounded-lg object-cover"
                                />
                                <div className="absolute bottom-2.5 left-2.5">
                                    <CourseLevel courseLevel={courseDetail?.level ?? level.Beginner} />
                                </div>
                            </div>

                            <div className="sticky top-0 flex flex-col gap-4">
                                <h3 className="text-overflow cursor-pointer text-base font-bold text-black xl2:text-lg">
                                    {courseDetail?.name}
                                </h3>
                                {courseDetail?.price && courseDetail?.price_sale ? (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <RiMoneyDollarCircleFill className="size-4 text-orange-500" />
                                            <del>{Math.floor(courseDetail?.price)} xu</del>
                                        </div>
                                        <p className="font-semibold text-red-600">
                                            {Math.floor(courseDetail?.price_sale)} xu
                                        </p>
                                    </div>
                                ) : (
                                    <span className="text-sm text-orange-500 lg:text-base">Miễn phí</span>
                                )}

                                <div className="flex items-center gap-2">
                                    <Link to="" className="flex w-full items-center gap-2.5">
                                        <Avatar className="size-8 flex-shrink-0">
                                            <AvatarImage
                                                src={getImagesUrl(user?.avatar as string) || ''}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                                {user?.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="w-fit text-sm font-medium xl2:text-base">{user?.name}</p>
                                    </Link>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <FaRegUser className="size-4 text-darkGrey" />
                                        <p className="font-medium text-black">{courseDetail?.total_student}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <IoTimeOutline className="size-4 text-darkGrey" />
                                        <p className="font-medium text-black">{courseDetail?.total_duration_video}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaRegCirclePlay className="size-4 text-darkGrey" />
                                        <p className="font-medium text-black">{courseDetail?.total_lessons}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
