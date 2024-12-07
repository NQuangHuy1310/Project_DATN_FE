import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface CountdownProps {
    endTime: string
    voucherCode: string
}

const TopBar = ({ endTime, voucherCode }: CountdownProps) => {
    const calculateInitialTotalSeconds = () => {
        const end = new Date(endTime).getTime()
        const current = Date.now()
        const distance = end - current
        return Math.max(Math.floor(distance / 1000), 0)
    }

    const [totalSeconds, setTotalSeconds] = useState(calculateInitialTotalSeconds())
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setTotalSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1
                } else {
                    clearInterval(interval)
                    return 0
                }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : num)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (!voucherCode || !isVisible) {
        return null
    }

    return (
        <div className="relative flex flex-col gap-1 bg-[#9fdfff] p-3 text-center">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-4 text-xl font-medium hover:text-darkGrey"
            >
                <IoClose className="text-2xl" />
            </button>
            <span className="text-base font-medium">
                Mã giảm giá mới: <b>{voucherCode}</b> | Giảm giá cho mọi khóa học
            </span>
            <span className="text-base font-bold">
                Mã giảm giá kết thúc sau: {formatNumber(hours)} giờ {formatNumber(minutes)} phút {formatNumber(seconds)}{' '}
                giây
            </span>
        </div>
    )
}

export default TopBar
