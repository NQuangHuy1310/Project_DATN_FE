import { Link } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu'
import { IoIosStar } from 'react-icons/io'
import { CiViewList } from 'react-icons/ci'

import { ITeacher } from '@/types'
import { TeacherStatus } from '@/constants'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Teacher = ({ image, name, job, reviewStart, status, totalCourse, totalReview }: ITeacher) => {
    return (
        <div className="flex w-full flex-col gap-6 overflow-hidden rounded-lg bg-white p-5 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all md:w-[360px] md:p-7">
            <div className="flex items-center justify-between gap-2">
                <Link to="" className="flex flex-shrink-0 items-center gap-3 truncate">
                    <Avatar className="size-9 md:size-11">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="flex size-11 items-center justify-center bg-slate-500/50 font-semibold">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold md:text-base">{name}</h4>
                        <p className="text-xs text-darkGrey">{job}</p>
                    </div>
                </Link>
                {status === TeacherStatus.follow && (
                    <Button variant="outline" className="flex gap-1 px-2 text-xs">
                        <LuPlus />
                        {TeacherStatus.follow}
                    </Button>
                )}
                {status === TeacherStatus.followed && (
                    <Button variant="default" className="px-2 text-xs">
                        {TeacherStatus.followed}
                    </Button>
                )}
                {status === TeacherStatus.unFollow && (
                    <Button variant="destructive" className="px-2 text-xs">
                        {TeacherStatus.unFollow}
                    </Button>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <CiViewList className="size-4 text-darkGrey md:size-5" />
                    <p className="text-sm font-medium md:text-base">{totalCourse} Khoá học</p>
                </div>
                <div className="flex items-center gap-1">
                    <IoIosStar className="size-4 text-primary md:size-5" />
                    <p className="text-sm font-medium md:text-base">
                        {reviewStart} ({totalReview} Review)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Teacher
