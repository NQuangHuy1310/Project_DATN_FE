import { Link } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ICourseToday } from '@/types/course/course'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { getImagesUrl } from '@/lib'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const CourseToday = ({
    course_thumbnail,
    course_name,
    course_slug,
    user,
    level,
    module,
    total_student,
    totalVideo,
    totalTime,
    price,
    price_sale,
    page
}: ICourseToday) => {
    return (
        <div className="card flex w-full max-w-full cursor-text flex-col gap-4 p-4 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all lg:max-w-[360px] xl:max-w-[400px] xl:p-7 2xl:max-w-[400px]">
            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                <img
                    src={getImagesUrl(course_thumbnail)}
                    alt={course_name}
                    className="h-full w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5">
                    <CourseLevel courseLevel={level!} />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-overflow cursor-pointer text-base font-bold text-black xl2:text-lg">
                    {course_name}
                </h3>
                {price && price_sale ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <RiMoneyDollarCircleFill className="size-4 text-orange-500" />
                            <del>{Math.floor(price)} xu</del>
                        </div>
                        <p className="font-semibold text-red-600">{Math.floor(price_sale)} xu</p>
                    </div>
                ) : (
                    <span className="text-sm text-orange-500 lg:text-base">Miễn phí</span>
                )}

                <div className="flex items-center justify-between">
                    <Link to="" className="flex w-full items-center justify-between gap-2.5">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={user?.avatar || ''} alt={user?.name} />
                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="w-fit text-sm xl2:text-base">{user?.name}</p>
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <FaRegUser className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{total_student}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <IoTimeOutline className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{totalTime ? useFormatTime(totalTime!) : 0}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaRegCirclePlay className="size-4 text-darkGrey" />
                        <p className="font-medium text-black">{totalVideo}</p>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold xl2:text-base">{module.length} Chương</h3>
                        <span className="text-sm text-darkGrey xl2:text-base">0/{module.length} hoàn thành</span>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {module.map((item, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-8 rounded-md border bg-darkGrey/20 text-center font-semibold leading-8">
                                        {index + 1}
                                    </span>
                                    <h4 className="text-darkGrey">{item.title}</h4>
                                </div>
                                <span className="text-darkGrey">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {page === routes.courseDetail ? (
                <Link
                    className="rounded-md bg-primary py-2 text-center text-white"
                    to={`/payment/course/${course_slug}`}
                >
                    Mua khóa học
                </Link>
            ) : (
                <Button>Xem chi tiết</Button>
            )}
        </div>
    )
}

export default CourseToday
