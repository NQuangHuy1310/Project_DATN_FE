import { FaUsers } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { MdAttachMoney, MdOutlineSmartDisplay } from 'react-icons/md'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { useGetCourses, useStatistic } from '@/app/hooks/instructors'
import noContent from '@/assets/no-content.jpg'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import routes from '@/configs/routes'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const chartConfig = {
    views: {
        label: 'Tổng doanh thu: '
    },
    desktop: {
        label: 'Doanh thu',
        color: 'hsl(var(--primary))'
    }
}

const PerformanceOverview = () => {
    const navigate = useNavigate()
    const { data: courseData } = useGetCourses()
    const { data: statisticData } = useStatistic()

    const monthlyRevenue = statisticData?.monthly_revenue || {}

    const chartData = Object.entries(monthlyRevenue).map(([month, revenue]) => {
        return {
            date: `2024-${month.padStart(2, '0')}-01`,
            desktop: parseFloat((revenue / 1).toFixed(2))
        }
    })

    return (
        <div>
            {courseData && courseData.data.length > 0 ? (
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-xl font-semibold">Tổng quan</h4>
                        </div>
                    </div>

                    <div className="flex items-start gap-5">
                        <div className="flex h-[100px] min-w-[300px] items-start justify-between rounded-md border border-black/40 p-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    <MdAttachMoney className="size-5" />
                                    Doanh thu
                                </p>
                                <h5 className="text-3xl font-bold">
                                    {statisticData && parseFloat((statisticData?.total_revenue / 1).toFixed(2))}
                                </h5>
                            </div>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <IoMdInformationCircleOutline className="size-5 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[250px] bg-card-foreground">
                                        Doanh thu tổng cộng từ tất cả các giao dịch trên trang web của bạn.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex h-[100px] min-w-[300px] items-start justify-between rounded-md border border-black/40 p-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    <MdOutlineSmartDisplay className="size-5" />
                                    Tổng số khoá học
                                </p>
                                <h5 className="text-3xl font-bold">{statisticData && statisticData.total_courses}</h5>
                            </div>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <IoMdInformationCircleOutline className="size-5 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[250px] bg-card-foreground">
                                        Doanh thu tổng cộng từ tất cả các giao dịch trên trang web của bạn.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="flex h-[100px] min-w-[300px] items-start justify-between rounded-md border border-black/40 p-4">
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-1 text-base font-semibold">
                                    <FaUsers className="size-5" />
                                    Tổng số học viên
                                </p>
                                <h5 className="text-3xl font-bold">{statisticData && statisticData.total_students}</h5>
                            </div>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <IoMdInformationCircleOutline className="size-5 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[250px] bg-card-foreground">
                                        Doanh thu tổng cộng từ tất cả các giao dịch trên trang web của bạn.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                                <CardTitle>Biểu đồ doanh thu</CardTitle>
                                <CardDescription>
                                    Theo dõi doanh thu để nhận diện xu hướng và đưa ra quyết định kinh doanh tốt hơn.
                                </CardDescription>
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
