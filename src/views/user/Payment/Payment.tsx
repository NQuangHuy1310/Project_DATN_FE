import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { getImagesUrl } from '@/lib'
import routes from '@/configs/routes'
import { FaClock } from 'react-icons/fa'
import { IoIosStar } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import { IoArrowBackOutline } from 'react-icons/io5'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { useTransactionById } from '@/app/hooks/transactions/transaction'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useBuyCourse, usePaymentCourseBySlug } from '@/app/hooks/payment'
import Loading from '@/components/Common/Loading/Loading'
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog'

const Payment = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const slug = useGetSlugParams('slug')
    const navigate = useNavigate()
    // Lấy dữ liệu khóa học theo slug
    const { data: courseData, isLoading } = usePaymentCourseBySlug(slug!)
    // Lấy thông tin người dùng
    const { user } = useGetUserProfile()
    // Lấy dữ liệu giao dịch
    const { data: transactionData } = useTransactionById(user?.id || 0)
    // Tính toán số dư và giảm giá
    const balance = Math.floor(transactionData?.balance ?? 0)
    const discount = 0
    // Xử lý hành động thanh toán
    const { mutateAsync: confirmPayment } = useBuyCourse()
    const handlePayment = async () => {
        if (user && courseData) {
            if (balance < (courseData.price_sale || courseData.price) - discount) {
                toast.error('Số dư ví không đủ, vui lòng nạp thêm tiền')
            } else {
                await confirmPayment([
                    user?.id,
                    courseData?.course_id,
                    {
                        total_coin: courseData?.price,
                        coin_discount: discount,
                        total_coin_after_discount: (courseData.price_sale || courseData.price) - discount
                    }
                ])
            }
        }
        navigate(routes.myCourses)
    }

    if (isLoading) return <Loading />
    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="flex flex-col gap-5 md:flex-row">
                {/* Phần bên trái */}
                <div className="h-fit w-full rounded-md bg-white p-5 md:w-8/12">
                    <div className="flex flex-col gap-4">
                        <h2 className="border-b text-xl font-medium">Thông tin mua hàng</h2>
                        <div>
                            <div className="flex flex-col gap-10 py-2 md:flex-row">
                                <div className="max-w-[400px]">
                                    <img
                                        src={getImagesUrl(courseData?.course_thumbnail || '')}
                                        className="w-full rounded-md"
                                        alt=""
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h3 className="text-lg md:text-2xl font-bold">{courseData?.course_name}</h3>

                                    <div className="flex items-center gap-5">
                                        <div className="flex items-center gap-1">
                                            <IoIosStar className="size-5 text-primary" />
                                            <span className="text-[16px] font-medium">{courseData?.average_rating}</span>
                                        </div>
                                        <div>
                                            <span className="text-[16px] font-medium">{courseData?.total_lessons} bài học</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span className="text-[16px] font-medium">{
                                                courseData?.course_duration || 0
                                            }</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-7 md:size-10 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={courseData?.user_avatar}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {courseData?.user_avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-[16px] md:text-lg font-medium">{courseData?.user_name}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[16px] font-medium">Giá: </h4>
                                        <div className="flex gap-1">
                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                            <span className="text-[16px] font-semibold">
                                                {Math.floor(courseData?.price_sale || 0) || Math.floor(courseData?.price || 0)}
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Phần bên phải */}
                <div className="w-full rounded-md bg-white p-5 md:w-4/12">
                    <div className="flex flex-col gap-4">
                        <h2 className="border-b text-xl font-medium">Tóm tắt</h2>
                        <section className="flex flex-col gap-3 rounded-md">
                            <div className="flex justify-between">
                                <span className="text-[15px] font-medium">Số dư hiện tại:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">{balance}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium">Giá gốc:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">
                                        {Math.floor(courseData?.price_sale || 0) || Math.floor(courseData?.price || 0)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-[15px] font-medium">Giảm giá:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">{discount}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium">Tổng thanh toán:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">
                                        {courseData?.price_sale ? courseData?.price_sale - discount : (courseData?.price || 0) - discount}
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full justify-between border-b border-t py-4">
                                <input
                                    type="text"
                                    className="w-[78%] rounded-md border ps-2 outline-none md:w-[90%] lg:w-[70%]"
                                    placeholder="Nhập mã giảm giá"
                                />
                                <Button>Áp dụng</Button>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button className="w-full" onClick={() => setIsOpen(true)}>
                                    Thanh toán
                                </Button>
                                <div className='flex gap-2'>
                                    <Link to={routes.courseDetail} className="w-full">
                                        <Button variant="outline" className="flex w-full gap-2">
                                            <IoArrowBackOutline className="size-5" />
                                            Quay lại
                                        </Button>
                                    </Link>
                                    <Link to={routes.wallet} className="w-full">
                                        <Button className="w-full" variant="outline">
                                            Nạp thêm xu
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bạn có chắc chắn muốn mua khóa học không?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Sau khi mua khóa học bạn có thể xem chi tiết được toàn bộ bài học, giúp bạn
                                            học tập dễ dàng hơn
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction onClick={handlePayment}>Xác nhận</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
