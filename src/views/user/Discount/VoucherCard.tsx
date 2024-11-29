import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { DiscountCode } from '@/types/others'
import routes from '@/configs/routes'
import { useNavigate } from 'react-router-dom'

interface VoucherCardProps {
    voucher: DiscountCode
    slug: string
}

const VoucherCard = ({ voucher, slug }: VoucherCardProps) => {
    const navigate = useNavigate()
    const calculateTimeLeft = (endTime: string) => {
        const end = new Date(endTime).getTime()
        const current = Date.now()
        const distance = end - current

        if (distance <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 }
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        return { hours, minutes, seconds }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(voucher.end_time))

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(voucher.end_time))
        }, 1000)

        return () => clearInterval(timer)
    }, [voucher.end_time])

    const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

    return (
        <div className="relative w-full max-w-xl rounded-xl bg-white px-10 py-6 shadow-lg">
            <div className="absolute -left-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-softGrey"></div>
            <div className="absolute -right-5 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-softGrey"></div>
            <div className="flex items-center">
                <div className="flex-1">
                    <p className="py-2 text-xl font-bold">{voucher.code}</p>
                    {voucher.type === 'percent' && (
                        <p className="text-xl font-bold text-blue-500">
                            Giảm {Number(voucher.discount).toFixed(0)}% /khóa
                        </p>
                    )}
                    {voucher.type === 'fixed' && (
                        <p className="text-xl font-bold text-blue-500">
                            Giảm {Number(voucher.discount).toFixed(0)}xu /khóa
                        </p>
                    )}
                    <p className="text-sm text-gray-600">
                        Mô tả: <span className="font-medium">{voucher.description}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                        Còn <span className="font-bold">{voucher.count}</span> lượt sử dụng. Hết hạn:{' '}
                        <span className="font-medium">{new Date(voucher.end_time).toLocaleString()}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-red-500">
                    <FaClock className="size-4" />
                    {isExpired ? (
                        <span className="font-bold">Đã hết hạn</span>
                    ) : (
                        <span className="font-bold">
                            {`${timeLeft.hours.toString().padStart(2, '0')}:${timeLeft.minutes
                                .toString()
                                .padStart(2, '0')}:${timeLeft.seconds.toString().padStart(2, '0')}`}
                        </span>
                    )}
                </div>
                <Button
                    disabled={isExpired}
                    className={`${isExpired ? 'opacity-50' : ''}`}
                    onClick={() => navigate(`${routes.courseDetail.replace(':slug', slug)}?discount=${voucher.code}`)}
                >
                    Sử dụng ngay
                </Button>
            </div>
        </div>
    )
}

export default VoucherCard
