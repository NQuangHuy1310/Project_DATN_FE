import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useGetCourses } from '@/app/hooks/instructors'
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
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes.ts'

const chartConfig = {
    views: {
        label: 'Tổng doanh thu: '
    },
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--primary))'
    }
} satisfies ChartConfig

const PerformanceOverview = () => {
    const navigate = useNavigate()
    const chartData = [
        { date: '2024-01-01', desktop: 222 },
        { date: '2024-02-02', desktop: 97 },
        { date: '2024-03-03', desktop: 167 },
        { date: '2024-04-04', desktop: 242 },
        { date: '2024-05-05', desktop: 373 },
        { date: '2024-06-06', desktop: 301 },
        { date: '2024-07-07', desktop: 245 },
        { date: '2024-08-08', desktop: 409 },
        { date: '2024-09-09', desktop: 59 },
        { date: '2024-10-10', desktop: 261 },
        { date: '2024-11-11', desktop: 327 },
        { date: '2024-12-12', desktop: 292 }
    ]

    const { data: courseData } = useGetCourses()

    return (
        <div>
            {courseData && courseData?.data.length > 0 ? (
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
                                    <SelectValue placeholder="Chon khoá học" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chọn khoá học</SelectLabel>
                                        <SelectItem value="full">Tất cả khoá học</SelectItem>
                                        {courseData?.data.map((courseData) => (
                                            <SelectItem value={courseData.name}>{courseData.name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                <CardTitle>Thống kê doanh thu</CardTitle>
                                <CardDescription>Thống kê doanh thu của bạn trong 12 tháng vừa qua.</CardDescription>
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
                                            return date.toLocaleDateString('vi-VN', {
                                                month: 'short'
                                            })
                                        }}
                                    />
                                    <ChartTooltip
                                        content={
                                            <ChartTooltipContent
                                                className="w-[150px]"
                                                nameKey="views"
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
                    <img src={noContent} alt="" className="w-1/5" />
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
