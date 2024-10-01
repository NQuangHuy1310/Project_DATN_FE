import { Link } from 'react-router-dom'

import { ICourseToday } from '@/types'
import { CourseLevel } from '@/components/shared/Course/CourseLevel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const CourseToday = ({ image, name, createdBy, level, module }: ICourseToday) => {
    return (
        <Link
            to=""
            className="flex w-full cursor-text flex-col gap-4 rounded-lg bg-white p-7 hover:shadow-[0px_40px_100px_0px_#0000000d] hover:transition-all"
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
                    <Link to="" className="flex w-full items-center justify-between gap-2.5">
                        <Avatar className="size-8 flex-shrink-0">
                            <AvatarImage src={createdBy?.avatar || ''} alt={createdBy.name} />
                            <AvatarFallback className="flex size-8 items-center justify-center bg-slate-500/50 font-semibold">
                                {createdBy.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p className={`w-fit ${!module && 'flex-1'}`}>{createdBy.name}</p>
                    </Link>
                </div>
                <div className="flex w-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">{module.length} Chương</h3>
                        <span className="text- text-darkGrey">0/5 hoàn thành</span>
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
        </Link>
    )
}

export default CourseToday
