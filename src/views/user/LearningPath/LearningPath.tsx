import { useGetCateLearningPath } from '@/app/hooks/others'
import { Button } from '@/components/ui/button'
import { faceBookGroupUrl } from '@/constants/constants'
import { getImagesUrl } from '@/lib/common'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '@/components/Common/Loading/Loading'
import routes from '@/configs/routes'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const LearningPath = () => {
    const navigate = useNavigate()
    const { data: cateLearningPath, isLoading } = useGetCateLearningPath()
    console.log(cateLearningPath)
    const radius = (64 - 8) / 2
    const circumference = 2 * Math.PI * radius
    if (isLoading) return <Loading />
    return (
        <div className="card">
            <div className="p-5">
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold">Lộ trình học</h2>
                    <p className="max-w-[800px] text-darkGrey">
                        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị
                        trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
                    </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-5">
                    {cateLearningPath &&
                        cateLearningPath.map((item) => (
                            <div className="rounded-xl border p-5 shadow">
                                <div className="flex gap-4">
                                    <div className="flex max-w-[400px] flex-col gap-2">
                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                        <p className="text-darkGrey">{item.description}</p>
                                    </div>
                                    <img
                                        src={getImagesUrl(item.image)}
                                        className="w-full max-w-[150px] rounded-full object-cover"
                                        alt=""
                                    />
                                </div>
                                <div className="flex gap-2 pb-4">
                                    {item.courses.map((course) => {
                                        console.log(course?.progress[0]?.progress_percent)
                                        return (
                                            <div
                                                className="relative flex items-center justify-center"
                                                style={{ width: 64, height: 64 }}
                                            >
                                                {course?.progress[0]?.progress_percent && (
                                                    <svg
                                                        width={64}
                                                        height={64}
                                                        className="absolute left-0 top-0"
                                                        style={{ transform: 'rotate(-90deg)' }}
                                                    >
                                                        <circle
                                                            cx={64 / 2}
                                                            cy={64 / 2}
                                                            r={radius}
                                                            stroke={
                                                                course?.progress[0]?.progress_percent == 100
                                                                    ? '#33CCFF'
                                                                    : '#DDDDDD'
                                                            }
                                                            strokeWidth={4}
                                                            fill="none"
                                                        />
                                                        <circle
                                                            cx={64 / 2}
                                                            cy={64 / 2}
                                                            r={radius}
                                                            stroke="#33CCFF"
                                                            strokeWidth={4}
                                                            fill="none"
                                                            strokeDasharray={circumference}
                                                            strokeDashoffset={
                                                                course?.progress[0]?.progress_percent == 100
                                                                    ? 176
                                                                    : circumference -
                                                                      (course?.progress[0]?.progress_percent / 100) *
                                                                          circumference
                                                            }
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                )}
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <img
                                                                src={getImagesUrl(course.thumbnail)}
                                                                alt="Icon"
                                                                className="absolute h-11 w-11 cursor-pointer rounded-full"
                                                                onClick={() => {
                                                                    if (course.progress && course.progress.length > 0) {
                                                                        navigate(
                                                                            routes.courseLeaning.replace(
                                                                                ':slug',
                                                                                course.slug
                                                                            )
                                                                        )
                                                                    } else {
                                                                        navigate(
                                                                            routes.courseDetail.replace(
                                                                                ':slug',
                                                                                course.slug
                                                                            )
                                                                        )
                                                                    }
                                                                }}
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {course.progress && course.progress[0]?.progress_percent}
                                                            {course.progress &&
                                                                course.progress[0]?.progress_percent &&
                                                                '% - '}
                                                            {course.name}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        )
                                    })}
                                </div>
                                <Button onClick={() => navigate(routes.courseLeaningPath.replace(':slug', item.slug))}>
                                    Xem chi tiết
                                </Button>
                            </div>
                        ))}
                </div>

                <div className="mt-10">
                    <div className="flex max-w-[600px] flex-col gap-5">
                        <h3 className="text-2xl font-bold">Tham gia cộng đồng học viên Coursea trên Facebook</h3>
                        <p className="text-darkGrey">
                            Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ
                            trợ nhau trong quá trình học nhé.
                        </p>
                        <Link
                            to={faceBookGroupUrl}
                            className="w-fit rounded-lg border px-4 py-2 duration-300 hover:bg-primary hover:text-white"
                        >
                            Tham gia nhóm
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LearningPath
