import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useGetCourses, useStatistic } from '@/app/hooks/instructors'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import noContent from '@/assets/no-content.jpg'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes'

const chartConfig = {
    views: {
        label: 'Tổng doanh thu: '
    },
    desktop: {
        label: 'Doanh thu theo tháng',
        color: 'hsl(var(--primary))'
    }
}

const PerformanceOverview = () => {
    const navigate = useNavigate()
    const { data: courseData } = useGetCourses()
    const { data: statisticData } = useStatistic()

    const monthlyRevenue = statisticData?.monthly_revenue || {}

    const chartData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
        date: `2024-${month.padStart(2, '0')}-01`,
        desktop: revenue
    }))

    return (
        <div>
            {courseData && courseData.data.length > 0 ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-xl font-semibold">Tổng quan</h4>
                            <p className="text-base">Xem thống kê chi tiết hàng đầu về hiệu suất của bạn</p>
                            <p className="text-base">
                                Đây là thông tin chi tiết về doanh thu và số người đăng ký trong 12 tháng qua. Hãy theo
                                dõi để cải thiện hiệu suất của bạn trong tương lai!
                            </p>
                        </div>
                        <div>
                            <Select>
                                <SelectTrigger className="flex w-[300px] items-center justify-between">
                                    <SelectValue placeholder="Chọn khoá học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chọn khoá học</SelectLabel>
                                        <SelectItem value="full">Tất cả khoá học</SelectItem>
                                        {courseData.data.map((course) => (
                                            <SelectItem key={course.id} value={course.name}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                <CardTitle className="text-base">Thống kê doanh thu</CardTitle>
                                <div className="flex items-center gap-4 text-base">
                                    <p>
                                        Tổng doanh thu: <strong>{statisticData?.total_revenue}</strong>
                                    </p>
                                    <p>
                                        Tổng khoá học: <strong>{statisticData?.total_courses}</strong>
                                    </p>
                                    <p>
                                        Tổng học sinh: <strong>{statisticData?.total_students}</strong>
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-2 sm:p-6">
                            <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                                <BarChart data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        minTickGap={32}
                                        tickFormatter={(value) => {
                                            const date = new Date(value)
                                            return date.toLocaleDateString('vi-VN', { month: 'short' })
                                        }}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                className="w-[150px]"
                                                nameKey="desktop"
                                                labelFormatter={(value) => {
                                                    return new Date(value).toLocaleDateString('vi-VN', {
                                                        month: 'short'
                                                    })
                                                }}
                                            />
                                        }
                                    />
                                    <Bar dataKey="desktop" fill={chartConfig.desktop.color} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <img src={noContent} alt="No Content" className="w-1/5" />
                    <p className="text-base font-medium text-muted-foreground">
                        Bạn chưa có khoá học nào, hãy tạo khoá học ngay.
                    </p>
                    <Button size="lg" onClick={() => navigate(routes.instructorDashboard)}>
                        Tạo khoá học mới
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PerformanceOverview
