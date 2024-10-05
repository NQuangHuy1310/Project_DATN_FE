import { Link } from 'react-router-dom'

import { ICourseToday } from '@/types'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import { FaRegUser } from 'react-icons/fa'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { IoTimeOutline } from 'react-icons/io5'

const CourseToday = ({
    image,
    name,
    createdBy,
    level,
    module,
    studentCount,
    totalVideo,
    totalTime,
    page
}: ICourseToday) => {
    return (
        <div className="xl2:p-7 card flex w-full max-w-full cursor-text flex-col gap-4 p-4 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all lg:max-w-[360px] xl:max-w-[400px] 2xl:max-w-[500px]">
            {page !== routes.courseDetail && (
                <div className="relative h-[160px] flex-shrink-0 cursor-pointer">
                    <img src={image} alt={name} className="h-full w-full rounded-lg object-cover" />
                    <div className="absolute bottom-2.5 left-2.5">
                        <CourseLevel courseLevel={level} />
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-4">
                <h3 className="text-overflow xl2:text-lg cursor-pointer text-base font-bold text-black">{name}</h3>
                <div className="flex items-center justify-between">
                    <Link to="" className="flex w-full items-center justify-between gap-2.5">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={createdBy?.avatar || ''} alt={createdBy.name} />
                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                {createdBy.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className={`xl2:text-base w-fit text-sm`}>{createdBy.name}</p>
                    </Link>
                </div>
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
                <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="xl2:text-base text-sm font-semibold">{module.length} Chương</h3>
                        <span className="xl2:text-base text-sm text-darkGrey">0/5 hoàn thành</span>
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
            {page === routes.courseDetail ? <Button>Tham gia khóa học</Button> : <Button>Xem chi tiết</Button>}
        </div>
    )
}

export default CourseToday
