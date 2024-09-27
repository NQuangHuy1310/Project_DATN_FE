import { Link } from 'react-router-dom'
import { IoIosStar } from 'react-icons/io'

import { IMyCourse } from '@/types'
import { Avatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

const MyCourse = ({ image, name, star, progressLesson, totalLesson, createdBy, level }: IMyCourse) => {
    return (
        <Link to="" className="flex w-[350px] cursor-text flex-col gap-5 rounded-lg bg-white p-7 shadow-md">
            <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                <img src={image} alt={name} className="h-full w-full rounded-lg object-cover" />
                <div className="absolute bottom-2.5 left-2.5">
                    <CourseLevel courseLevel={level} />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="cursor-pointer text-lg font-bold text-black line-clamp-3">{name}</h3>
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
                <div className="w-full">
                    <Progress value={(progressLesson / totalLesson) * 100} />
                    <div className='flex justify-between my-2'>
                        <span>{progressLesson}/{totalLesson} Bài học</span>
                        <span>{((progressLesson / progressLesson) * 100).toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MyCourse
