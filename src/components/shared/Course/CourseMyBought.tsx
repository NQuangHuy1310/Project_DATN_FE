import { Link, useNavigate } from 'react-router-dom'
import { IoMdStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import CourseProgress from '@/components/shared/Course/CourseProgress'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDuration, getImagesUrl } from '@/lib'
import routes from '@/configs/routes'
import { ICourse } from '@/types/course/course'

const CourseMyBought = ({ data, progressLesson }: { data: ICourse; progressLesson?: number }) => {
    const navigate = useNavigate()
    const totalTime = formatDuration((data?.total_duration_video as unknown as number) || 0)

    const stars = [...Array(5)].map((_, index) => {
        const fullStar = index < Math.floor(data.ratings_avg_rate!)
        const halfStar = index === Math.floor(data.ratings_avg_rate!) && data.ratings_avg_rate! % 1 !== 0
        return { fullStar, halfStar }
    })

    return (
        <div className="card flex w-full cursor-text flex-col gap-4 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px]">
            <Link to={routes.courseDetail.replace(':slug', data.slug)}>
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
                {data?.is_course_bought === true ? (
                    data?.progress_percent === 100 ? (
                        <p className="text-base font-semibold text-orange-500">Đã hoàn thành</p>
                    ) : data?.progress_percent === 0 ? (
                        <p className="text-base font-semibold text-orange-500">Bắt đầu học</p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex h-2 w-full items-center overflow-hidden rounded bg-darkGrey/20">
                                <span
                                    className={`block h-full ${data?.level === 'Sơ cấp'
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
                ) : null}

                <div className="flex items-center justify-between">
                    {data.user && (
                        <div
                            onClick={() => navigate(routes.instructorDetail.replace(':id', String(data.id_user)))}
                            className="flex cursor-pointer items-center gap-2"
                        >
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

            </div>
            <div className="flex items-center gap-1">
                <span className="ml-1 font-semibold">
                    {(Number(data.ratings_avg_rate) % 1 === 0
                        ? Math.floor(Number(data.ratings_avg_rate))
                        : Number(data.ratings_avg_rate).toFixed(1)) || '0'}
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
                        <FaRegUser className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{data.total_student}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegCirclePlay className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{data.total_lessons}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <IoTimeOutline className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{totalTime}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseMyBought
