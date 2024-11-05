import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { FaClock } from 'react-icons/fa'
import { IoIosStar } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import { IoArrowBackOutline } from 'react-icons/io5'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

import { toast } from 'sonner'
import confirm from '@/assets/confirmPayment.png'
import { formatDuration, getImagesUrl } from '@/lib'

import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import { useTransactionById } from '@/app/hooks/transactions/useTransaction'
import { useApplyVoucher, useBuyCourse, usePaymentCourseBySlug } from '@/app/hooks/payment'

import { Button } from '@/components/ui/button'
import Loading from '@/components/Common/Loading/Loading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader
} from '@/components/ui/alert-dialog'

const Payment = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [voucherCode, setVoucherCode] = useState<string>('')
    const [discountValue, setDiscountValue] = useState<number>(0)

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

    const totalTime = formatDuration((courseData?.course_duration as unknown as number) || 0)
    const totalPrice = Math.floor(courseData?.price_sale || courseData?.price || 0)

    const { mutateAsync: confirmPayment } = useBuyCourse()
    const { mutateAsync: applyVoucher } = useApplyVoucher()

    const handleApplyVoucher = async () => {
        if (user && voucherCode) {
            const data = await applyVoucher([user?.id, voucherCode])

            if (data?.status === 'error') {
                toast.error(data.message)
            } else if (data?.voucher) {
                let calculatedDiscount = 0
                if (data.voucher.type === 'percent') {
                    calculatedDiscount = (totalPrice * data.voucher.discount) / 100
                } else if (data.voucher.type === 'fixed') {
                    calculatedDiscount = data.voucher.discount
                }
                const finalDiscount = Math.min(calculatedDiscount, totalPrice)
                setDiscountValue(finalDiscount)
                toast.success(data.message)
            }
        } else {
            toast.error('Vui lòng nhập mã giảm giá')
        }
    }

    const handlePayment = async () => {
        if (user && courseData) {
            const totalCoinAfterDiscount =
                (courseData.price_sale > 0 ? courseData.price_sale : courseData.price) - discountValue
            if (totalCoinAfterDiscount > 0 && balance < totalCoinAfterDiscount) {
                toast.error('Số dư ví không đủ, vui lòng nạp thêm tiền')
            } else {
                const response = await confirmPayment([
                    user?.id,
                    courseData?.course_id,
                    {
                        voucher_code: voucherCode,
                        total_coin: courseData.price_sale > 0 ? courseData.price_sale : courseData.price,
                        coin_discount: discountValue,
                        total_coin_after_discount: totalCoinAfterDiscount
                    }
                ])
                if (response.status === 'success') {
                    navigate(routes.myCourses)
                } else if (response.status === 'error') {
                    toast.error(response.message)
                }
            }
        }
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
                                    <h3 className="text-lg font-bold md:text-2xl">{courseData?.course_name}</h3>

                                    <div className="flex items-center gap-5">
                                        <div className="flex items-center gap-1">
                                            <IoIosStar className="size-5 text-primary" />
                                            <span className="text-[16px] font-medium">
                                                {courseData?.average_rating}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[16px] font-medium">
                                                {courseData?.total_lessons} bài học
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FaClock />
                                            <span className="text-[16px] font-medium">{totalTime}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-7 cursor-pointer md:size-10">
                                            <AvatarImage
                                                className="object-cover"
                                                src={courseData?.user_avatar}
                                                alt={user?.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {courseData?.user_name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-[16px] font-medium md:text-lg">{courseData?.user_name}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[16px] font-medium">Giá: </h4>
                                        <div className="flex gap-1">
                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                            <span className="text-[16px] font-semibold">
                                                {Math.floor(courseData?.price_sale || 0) ||
                                                    Math.floor(courseData?.price || 0)}
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
                                    <span className="font-medium">{totalPrice}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b pb-2">
                                <span className="text-[15px] font-medium">Giảm giá:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">{discountValue}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium">Tổng thanh toán:</span>
                                <div className="flex gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <span className="font-medium">
                                        {courseData?.price_sale && courseData.price_sale > 0
                                            ? courseData.price_sale - discountValue
                                            : (courseData?.price || 0) - discountValue}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 border-b border-t py-3">
                                <div className="flex w-full justify-between">
                                    <input
                                        type="text"
                                        className="w-[78%] rounded-md border ps-2 outline-none md:w-[90%] lg:w-[70%]"
                                        placeholder="Nhập mã giảm giá"
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                    />
                                    <Button onClick={handleApplyVoucher}>Áp dụng</Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button className="w-full" onClick={() => setIsOpen(true)}>
                                    Thanh toán
                                </Button>
                                <div className="flex gap-2">
                                    <Link to={`/course/${slug}`} className="w-full">
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
                            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogDescription>
                                            <div className="flex flex-col gap-5">
                                                <div className="mx-auto">
                                                    <img
                                                        src={confirm}
                                                        alt="xác nhận mua"
                                                        className="w-52 object-contain"
                                                    />
                                                </div>
                                                <span className="text-center text-lg font-medium">
                                                    Bạn chắc chắn muốn mua khóa học này?
                                                </span>
                                            </div>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="mx-auto">
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
