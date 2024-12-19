import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { IoIosStar } from 'react-icons/io'
import { TbCoinFilled } from 'react-icons/tb'
import { IoTimeOutline } from 'react-icons/io5'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'

import { toast } from 'sonner'
import confirm from '@/assets/confirmPayment.png'
import { formatDuration, getImagesUrl } from '@/lib'

import { useTransactionById } from '@/app/hooks/transactions/useTransaction'
import { useApplyVoucher, useBuyCourse } from '@/app/hooks/payment'

import { Button } from '@/components/ui/button'
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
import { IBuyData } from '@/types'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ICourse } from '@/types/course/course'

const Payment = ({
    isOpenPayment,
    handleIsOpen,
    discount,
    courseData
}: {
    isOpenPayment: boolean
    handleIsOpen: (value: boolean) => void
    discount?: string
    courseData: ICourse
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [voucherCode, setVoucherCode] = useState<string>('')
    const [discountValue, setDiscountValue] = useState<number>(0)
    const [isVoucherApplied, setIsVoucherApplied] = useState<boolean>(false)
    const { user } = useGetUserProfile()
    const { data: transactionData } = useTransactionById(user?.id || 0)
    const { mutateAsync: confirmPayment } = useBuyCourse(courseData.slug)
    const { mutateAsync: applyVoucher } = useApplyVoucher()
    const balance = Math.floor(transactionData?.balance ?? 0)
    const totalTime = formatDuration((courseData?.total_duration_video as unknown as number) || 0)
    const totalPrice = Math.floor(
        courseData?.price_sale && courseData.price_sale > 0 ? courseData.price_sale : (courseData?.price ?? 0)
    )
    useEffect(() => {
        if (discount) {
            setVoucherCode(discount)
        }
    }, [discount])

    const handleApplyVoucher = async () => {
        if (isVoucherApplied) {
            setIsVoucherApplied(false)
            setVoucherCode('')
            setDiscountValue(0)
        } else if (user && voucherCode) {
            const data = await applyVoucher([courseData?.id, discount ? discount : voucherCode])
            if (data.status === 'error') toast.error(data.message)
            const voucher = data.voucher
            if (voucher) {
                const calculatedDiscount =
                    voucher.type === 'percent' ? (totalPrice * voucher.discount) / 100 : voucher.discount

                const finalDiscount = Math.min(calculatedDiscount, totalPrice)
                setDiscountValue(finalDiscount)
                setIsVoucherApplied(true)
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
                const payload: [number, number, IBuyData] = [
                    user?.id,
                    courseData?.id,
                    {
                        voucher_code: voucherCode,
                        total_coin: courseData.price_sale > 0 ? courseData.price_sale : courseData.price,
                        coin_discount: discountValue,
                        total_coin_after_discount: totalCoinAfterDiscount
                    }
                ]
                await confirmPayment(payload)
            }
        }
    }

    const navigate = useNavigate()

    return (
        <Dialog
            open={isOpenPayment}
            onOpenChange={() => {
                navigate(routes.courseDetail.replace(':slug', courseData.slug))
                handleIsOpen(false)
            }}
        >
            <DialogContent className="max-w-5xl p-4">
                <div className="flex flex-wrap gap-2 md:flex-nowrap">
                    {/* Phần bên trái */}
                    <div className="h-fit w-full rounded-md bg-white p-5 md:w-8/12">
                        <h2 className="border-b text-xl font-medium">Thông tin khóa học</h2>
                        <div className="flex flex-col gap-4 pt-2">
                            <div className="flex flex-wrap gap-5 py-2">
                                <div className="relative h-[200px] w-full flex-shrink-0 cursor-pointer md:w-[50%]">
                                    <img
                                        src={getImagesUrl(courseData?.thumbnail || '')}
                                        alt={courseData?.name}
                                        className="h-full w-full rounded-lg object-cover"
                                    />
                                    <div className="absolute bottom-2.5 left-2.5">
                                        <CourseLevel courseLevel={courseData?.level || ''} />
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-3">
                                    <h3 className="text-lg font-bold md:text-xl">{courseData?.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <button className="rounded-full bg-grey px-3 py-1 text-xs font-medium">
                                            {courseData?.category?.name}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {courseData?.price && courseData?.price != 0 ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    {courseData?.price_sale && courseData?.price_sale != 0 ? (
                                                        <div className="flex items-center gap-1">
                                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                                            <del className="text-[12px] font-semibold">
                                                                {Math.floor(courseData?.price)}
                                                            </del>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1">
                                                            <TbCoinFilled className="size-5 text-yellow-500" />
                                                            <p className="text-base font-semibold text-red-600">
                                                                {Math.floor(courseData?.price)}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                {courseData?.price_sale && courseData?.price_sale != 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <TbCoinFilled className="size-5 text-yellow-500" />
                                                        <p className="text-base font-semibold text-red-600">
                                                            {Math.floor(courseData?.price_sale)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-base font-semibold text-orange-500">Miễn phí</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Avatar className="size-6 flex-shrink-0">
                                            <AvatarImage
                                                src={getImagesUrl(courseData.user?.avatar || '')}
                                                alt={courseData?.user?.name}
                                            />
                                            <AvatarFallback className="flex size-6 items-center justify-center bg-slate-500/50 font-semibold">
                                                {courseData?.user?.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="flex-1 font-medium">{courseData?.user?.name}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-5">
                                        <div className="flex items-center gap-1">
                                            <IoIosStar className="size-5 text-primary" />
                                            <span className="text-sm font-medium">{(Number(courseData.ratings_avg_rate) % 1 === 0
                                                ? Math.floor(Number(courseData.ratings_avg_rate))
                                                : Number(courseData.ratings_avg_rate).toFixed(1)) || '0'}</span>
                                        </div>
                                        <div>
                                            <span className="flex items-center gap-1.5 text-sm font-medium">
                                                <FaRegCirclePlay className="size-5 text-darkGrey" />
                                                {courseData?.total_lessons} bài học
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            <IoTimeOutline className="size-5 text-darkGrey" />
                                            <span className="text-sm font-medium">{totalTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Phần bên phải */}
                    <div className="w-full rounded-md bg-softGrey p-5 md:w-4/12">
                        <div className="flex flex-col gap-4">
                            <h2 className="border-b text-xl font-medium">Chi tiết thanh toán</h2>
                            <section className="flex flex-col gap-3 rounded-md">
                                <div className="flex flex-col gap-2 border-b pb-3">
                                    <div className="flex w-full justify-between gap-2">
                                        <input
                                            type="text"
                                            className="w-[78%] rounded-md border ps-2 outline-none md:w-[90%] lg:w-[70%]"
                                            placeholder="Nhập mã giảm giá"
                                            value={voucherCode}
                                            onChange={(e) => setVoucherCode(e.target.value)}
                                            readOnly={isVoucherApplied}
                                        />
                                        <Button onClick={handleApplyVoucher}>
                                            {isVoucherApplied ? 'Đổi mã' : 'Áp dụng'}
                                        </Button>
                                    </div>
                                    <Link
                                        className="text-xs italic text-primary"
                                        to={routes.discount.replace(':slug', courseData.slug)}
                                    >
                                        Xem danh sách mã giảm giá
                                    </Link>
                                </div>
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
                                <div className="flex flex-col gap-3">
                                    <Button className="w-full" onClick={() => setIsOpen(true)}>
                                        Thanh toán
                                    </Button>
                                    <div className="flex gap-2">
                                        <Link to={routes.wallet} className="w-full">
                                            <Button className="flex w-full items-center gap-2" variant="outline">
                                                <TbCoinFilled className="size-4 text-yellow-500" />
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
            </DialogContent>
        </Dialog>
    )
}

export default Payment
