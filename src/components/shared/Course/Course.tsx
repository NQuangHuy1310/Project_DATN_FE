import { Link, useNavigate } from 'react-router-dom'

import { IoMdStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import CourseProgress from '@/components/shared/Course/CourseProgress'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ICourse } from '@/types/course/course'
import { formatDuration, getImagesUrl } from '@/lib'
import routes from '@/configs/routes'
import { TbCoinFilled } from 'react-icons/tb'

const Course = ({ data, progressLesson, page }: { data: ICourse; progressLesson?: number; page?: string }) => {
    const navigate = useNavigate()
    const totalTime = formatDuration((data?.total_duration_video as unknown as number) || 0)
    const stars = [...Array(5)].map((_, index) => {
        const fullStar = index < Math.floor(data.ratings_avg_rate!)
        const halfStar = index === Math.floor(data.ratings_avg_rate!) && data.ratings_avg_rate! % 1 !== 0
        return { fullStar, halfStar }
    })
    return (
        <div className="card flex w-full cursor-text flex-col gap-3 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px]">
            <Link
                to={page == routes.dataNoLogin ? `/course/${data.slug}` : `/courses/${data.slug}`}
                className="flex flex-col gap-2"
            >
                <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                    <img
                        src={getImagesUrl(data.thumbnail!)}
                        alt={data.name}
                        className="h-full w-full rounded-lg object-cover"
                    />
                    <div className="absolute bottom-2.5 left-2.5">
                        <CourseLevel courseLevel={data.level!} />
                    </div>
                </div>
                <h3 className="text-overflow cursor-pointer text-base font-bold text-black md:text-lg">{data.name}</h3>
            </Link>
            <div className="flex flex-col gap-2.5">
                <div>
                    {data?.is_course_bought === true ? (
                        data?.progress_percent === 100 ? (
                            <p className="text-base font-semibold text-orange-500">Đã hoàn thành</p>
                        ) : data?.progress_percent === 0 ? (
                            <p className="text-base font-semibold text-orange-500">Bắt đầu học</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="flex h-2 w-full items-center overflow-hidden rounded bg-darkGrey/20">
                                    <span
                                        className={`block h-full ${
                                            data?.level === 'Sơ cấp'
                                                ? 'bg-secondaryYellow'
                                                : data?.level === 'Trung cấp'
                                                  ? 'bg-secondaryGreen'
                                                  : 'bg-secondaryRed'
                                        }`}
                                        style={{ width: `${data?.progress_percent}%` }}
                                    ></span>
                                    <span
                                        className="block h-full bg-darkGrey/20"
                                        style={{ width: `${100 - data?.progress_percent}%` }}
                                    ></span>
                                </div>
                                <span className="text-end text-sm font-medium">
                                    {data?.progress_percent}% hoàn thành
                                </span>
                            </div>
                        )
                    ) : data?.price && data?.price !== 0 ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {data?.price_sale && data?.price_sale !== 0 ? (
                                    <div className="flex items-center gap-1">
                                        <TbCoinFilled className="size-5 text-yellow-500" />
                                        <del className="font-semibold text-red-600">{Math.floor(data?.price)}</del>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <TbCoinFilled className="size-5 text-yellow-500" />
                                        <p className="text-base font-semibold text-red-600">
                                            {Math.floor(data?.price)}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {data?.price_sale && data?.price_sale !== 0 && (
                                <div className="flex items-center gap-1">
                                    <TbCoinFilled className="size-5 text-yellow-500" />
                                    <p className="text-base text-red-600">{Math.floor(data?.price_sale)}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="text-base font-semibold text-orange-500">Miễn phí</span>
                    )}
                </div>

                <div
                    onClick={() => navigate(routes.instructorDetail.replace(':id', String(data.id_user)))}
                    className={`flex ${!data.is_course_bought ? 'mt-2.5' : ''} cursor-pointer`}
                >
                    {data.user && (
                        <div className="flex w-fit items-center gap-2">
                            <Avatar className="size-8 flex-shrink-0">
                                <AvatarImage src={getImagesUrl(data.user?.avatar || '')} alt={data.user.name} />
                                <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                    {data.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <p className="flex-1">{data.user.name}</p>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <span className="ml-1 font-semibold">
                        {data.ratings_avg_rate! % 1 === 0
                            ? Math.floor(data.ratings_avg_rate!)
                            : data.ratings_avg_rate!.toFixed(1)}
                    </span>

                    {stars.map((star, starIndex) => (
                        <div key={starIndex} className="relative">
                            <IoMdStar className="size-4 text-gray-300" />
                            {star.fullStar && <IoMdStar className="absolute left-0 top-0 size-4 text-primary" />}
                            {star.halfStar && (
                                <IoMdStar
                                    className="absolute left-0 top-0 size-4 text-primary"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                />
                            )}
                        </div>
                    ))}
                    <span className="ml-1 font-medium text-darkGrey">({data.ratings_count} đánh giá)</span>
                </div>
                {progressLesson && data.total_lessons ? (
                    <CourseProgress
                        progressLesson={progressLesson}
                        totalLesson={data.total_lessons}
                        level={data.level!}
                    />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <FaRegUser className="size-5 text-darkGrey" />
                            <p className="font-medium text-black">{data.total_student}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaRegCirclePlay className="size-5 text-darkGrey" />
                            <p className="font-medium text-black">{data.total_lessons}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <IoTimeOutline className="size-5 text-darkGrey" />
                            <p className="font-medium text-black">{totalTime}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Course
