import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const PerformanceOverview = () => {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <h4 className="text-3xl font-semibold">Tổng quan</h4>
                <p className="mt-2 text-xl">Xem thống kê chi tiết hàng đầu về hiệu suất của bạn</p>
                <p className="mt-2 text-base text-gray-700">
                    Đây là thông tin chi tiết về doanh thu và số người đăng ký trong 12 tháng qua. Hãy theo dõi để cải
                    thiện hiệu suất của bạn trong tương lai!
                </p>
            </div>
            <div>
                <Select>
                    <SelectTrigger className="flex w-[300px] items-center justify-between">
                        <SelectValue placeholder=" -- Thống kê -- " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple">Tổng doanh thu</SelectItem>
                            <SelectItem value="banana">Tổng số lượt ghi danh</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default PerformanceOverview
