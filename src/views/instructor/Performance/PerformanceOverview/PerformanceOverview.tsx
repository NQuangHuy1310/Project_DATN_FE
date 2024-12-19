import { useCallback, useMemo, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { MdAttachMoney, MdOutlineSmartDisplay } from 'react-icons/md'

import { useGetCourses, useStatistic } from '@/app/hooks/instructors'

import routes from '@/configs/routes'
import noContent from '@/assets/no-content.jpg'
import { Button } from '@/components/ui/button'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import CourseCard from '@/components/shared/CourseCard'

const chartConfig = {
    views: {
        label: 'Tổng doanh thu: '
    },
    desktop: {
        label: 'Doanh thu',
        color: 'hsl(var(--primary))'
    }
}

const statisticFilter = [
    { name: 'Hôm nay', key: 'today' },
    { name: 'Hôm qua', key: 'yesterday' },
    { name: 'Tuần này', key: 'this_week' },
    { name: 'Tháng này', key: 'this_month' },
    { name: 'Năm nay', key: 'this_year' }
]

const PerformanceOverview = () => {
    const navigate = useNavigate()
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined)

    const { data: courseData } = useGetCourses()
    const { data: statisticData } = useStatistic(selectedFilter)

    const monthlyRevenue = useMemo(() => statisticData?.monthly_revenue || {}, [statisticData])

    const chartData = useCallback(
        () =>
            Object.entries(monthlyRevenue)
                .sort(([monthA], [monthB]) => parseInt(monthA) - parseInt(monthB))
                .map(([month, revenue]) => ({
                    date: `2024-${month.padStart(2, '0')}-01`,
                    desktop: parseFloat((revenue / 1).toFixed(2))
                })),
        [monthlyRevenue]
    )

    const handleChange = (value: string) => {
        setSelectedFilter(value)
    }

    return (
        <div>
            {courseData && courseData.data.length > 0 ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-xl font-semibold">Tổng Quan Thống Kê Giảng Viên</h4>
                        </div>
                        <Select value={selectedFilter} onValueChange={handleChange}>
                            <SelectTrigger className="flex h-[40px] w-[280px] items-center justify-between">
                                <SelectValue placeholder="Chọn thời gian" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {statisticFilter.map((item) => (
                                        <SelectItem value={item.key} key={item.key}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <h5 className="text-base font-medium text-foreground">Thông Tin Tổng Hợp Về Khóa Học</h5>
                        <div className="flex items-start gap-6">
                            <StatisticCard
                                icon={MdAttachMoney}
                                title="Doanh Thu Tổng Cộng"
                                value={statisticData ? parseFloat((statisticData.total_revenue / 1).toFixed(2)) : 0}
                                tooltip="Tổng doanh thu từ tất cả các khóa học mà bạn đã giảng dạy."
                            />
                            <StatisticCard
                                icon={MdOutlineSmartDisplay}
                                title="Tổng Số Khóa Học"
                                value={statisticData?.total_courses || 0}
                                tooltip="Tổng số khóa học mà bạn hiện đang giảng dạy trên nền tảng."
                            />
                            <StatisticCard
                                icon={FaUsers}
                                title="Tổng Số Học Viên"
                                value={statisticData?.total_students || 0}
                                tooltip="Số lượng học viên đã đăng ký vào các khóa học của bạn."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h5 className="text-base font-medium text-foreground">Biểu Đồ Doanh Thu Theo Thời Gian</h5>
                        <Card>
                            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                                <div className="flex w-full items-center justify-between pr-4">
                                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                        <CardTitle>Biểu đồ doanh thu</CardTitle>
                                        <CardDescription>
                                            Theo dõi doanh thu để nhận diện xu hướng và đưa ra quyết định kinh doanh tốt
                                            hơn.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-2 sm:p-6">
                                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                                    <BarChart data={chartData()}>
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
                    <div className="space-y-2">
                        <h5 className="text-base font-medium text-foreground">Khóa Học Nổi Bật Của Bạn</h5>
                        <div className="flex flex-wrap gap-4">
                            {statisticData && statisticData.top_courses.length > 0 ? (
                                statisticData.top_courses.map((course) => {
                                    return <CourseCard courseItem={course} key={course.id} isShowInfo />
                                })
                            ) : (
                                <p className="text-sm text-muted-foreground">Hiện tại không có khóa học nổi bật nào.</p>
                            )}
                        </div>
                    </div>
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

interface StatisticCardProps {
    icon: React.ElementType
    title: string
    value: number | string
    tooltip: string
}

const StatisticCard: React.FC<StatisticCardProps> = ({ icon: Icon, title, value, tooltip }) => (
    <div className="flex h-[100px] min-w-[300px] cursor-pointer items-start justify-between rounded-md border border-black/40 p-4">
        <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-base font-semibold">
                <Icon className="size-5" />
                {title}
            </p>
            <h5 className="text-3xl font-bold">{value}</h5>
        </div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <IoMdInformationCircleOutline className="size-5 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="w-[250px] bg-card-foreground">{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
)
