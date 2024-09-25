import { Link } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu'
import { IoIosStar } from 'react-icons/io'
import { CiViewList } from 'react-icons/ci'

import { ITeacher } from '@/types'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TeacherStatus } from '@/constants'

const Teacher = ({ image, name, job, reviewStart, status, totalCourse, totalReview }: ITeacher) => {
    return (
        <div className="flex max-w-[360px] flex-col gap-5 overflow-hidden rounded-lg bg-white p-7 shadow-md">
            <div className="flex items-center justify-between gap-2">
                <Link to="" className="flex flex-shrink-0 items-center gap-3 truncate">
                    <Avatar className="size-11">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="flex size-11 items-center justify-center bg-slate-500/50 font-semibold">
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h4 className="text-base font-bold">{name}</h4>
                        <p className="text-sm text-darkGrey">{job}</p>
                    </div>
                </Link>
                {status === TeacherStatus.follow && (
                    <Button variant="outline" className="flex gap-1">
                        <LuPlus />
                        Follow
                    </Button>
                )}
                {status === TeacherStatus.followed && <Button variant="default">Followed</Button>}
                {status === TeacherStatus.unFollow && <Button variant="destructive">Unfollow</Button>}
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
