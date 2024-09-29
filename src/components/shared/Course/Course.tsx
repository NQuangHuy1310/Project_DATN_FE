import { Link } from 'react-router-dom'
import { IoIosStar } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { IoTimeOutline } from 'react-icons/io5'

import { ICourse } from '@/types'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import CourseProgress from '@/components/shared/Course/CourseProgress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Course = ({
    image,
    name,
    star,
    studentCount,
    totalVideo,
    totalTime,
    createdBy,
    level,
    progressLesson,
    totalLesson
}: ICourse) => {
    return (
        <Link
            to=""
            className="flex w-[360px] cursor-text flex-col gap-4 rounded-lg bg-white p-7 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all"
        >
            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                <img src={image} alt={name} className="h-full w-full rounded-lg object-cover" />
                <div className="absolute bottom-2.5 left-2.5">
                    <CourseLevel courseLevel={level} />
                </div>
            </div>
            <div className="flex flex-col gap-2.5">
                <h3 className="text-overflow cursor-pointer text-lg font-bold text-black">{name}</h3>
                <div className="flex items-center justify-between">
                    <Link to="" className="flex items-center gap-2.5">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={createdBy?.avatar || ''} alt={createdBy.name} />
                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                {createdBy.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="flex-1">{createdBy.name}</p>
                    </Link>
                    <div className="flex items-center gap-1">
                        <IoIosStar className="size-5 text-primary" />
                        <span>{star}</span>
                    </div>
                </div>
                {progressLesson && totalLesson ? (
                    <CourseProgress progressLesson={progressLesson} totalLesson={totalLesson} level={level} />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <FaRegUser className="size-4 text-darkGrey" />
                            <p className="font-medium text-black">{studentCount}</p>
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
