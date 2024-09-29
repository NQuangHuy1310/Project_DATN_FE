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
        <div className="flex w-[360px] flex-col gap-6 overflow-hidden rounded-lg bg-white p-7 shadow-md hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all">
            <div className="flex items-center justify-between gap-2">
                <Link to="" className="flex flex-shrink-0 items-center gap-3 truncate">
                    <Avatar className="size-11">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="flex size-11 items-center justify-center bg-slate-500/50 font-semibold">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold">{name}</h4>
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
                    <CiViewList className="size-5 text-darkGrey" />
                    <p className="text-base font-medium">{totalCourse} Khoá học</p>
                </div>
                <div className="flex items-center gap-1">
                    <IoIosStar className="size-5 text-primary" />
                    <p className="text-base font-medium">
                        {reviewStart} ({totalReview} Review)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Teacher
