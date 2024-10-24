import { Link } from 'react-router-dom'

import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { IoTimeOutline } from 'react-icons/io5'
import { FaRegCirclePlay } from 'react-icons/fa6'

import CourseProgress from '@/components/shared/Course/CourseProgress'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ICourse } from '@/types/course/course'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const Course = ({
    course_name,
    course_thumbnail,
    average_rating,
    total_student,
    totalVideo,
    totalTime,
    createdBy,
    price,
    price_sale,
    level,
    progressLesson,
    totalLesson
}: ICourse) => {
    return (
        <Link
            to=""
            className="card flex w-full cursor-text flex-col gap-4 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px]"
        >
            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                <img src={course_thumbnail} alt={course_name} className="h-full w-full rounded-lg object-cover" />
                <div className="absolute bottom-2.5 left-2.5">
                    <CourseLevel courseLevel={level!} />
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <h3 className="text-overflow cursor-pointer text-base font-bold text-black md:text-lg">
                    {course_name}
                </h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <RiMoneyDollarCircleFill className="size-4 text-orange-500" />
                        <del>{Math.floor(price)} xu</del>
                    </div>
                    <p className="font-semibold text-red-600">{Math.floor(price_sale)} xu</p>
                </div>
                <div className="flex items-center justify-between">
                    {createdBy && (
                        <div className="flex items-center gap-2">
                            <Avatar className="size-8 flex-shrink-0">
                                <AvatarImage src={createdBy?.avatar || ''} alt={createdBy.name} />
                                <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                    {createdBy.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <p className="flex-1">{createdBy.name}</p>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <IoIosStar className="size-5 text-primary" />
                        <span>{average_rating}</span>
                    </div>
                </div>
                {progressLesson && totalLesson ? (
                    <CourseProgress progressLesson={progressLesson} totalLesson={totalLesson} level={level!} />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <FaRegUser className="size-4 text-darkGrey" />
                            <p className="font-medium text-black">{total_student}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FaRegCirclePlay className="size-4 text-darkGrey" />
                            <p className="font-medium text-black">{totalVideo}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <IoTimeOutline className="size-4 text-darkGrey" />
                            <p className="font-medium text-black">{totalTime}</p>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default Course
