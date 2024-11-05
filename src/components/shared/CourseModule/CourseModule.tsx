import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoIosDocument } from 'react-icons/io'
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlinePlayCircleOutline } from 'react-icons/md'

import { IModule } from '@/types/course/course.ts'
import { formatDuration } from '@/lib'

const CourseModule = ({ module }: { module: IModule }) => {
    const [isShowLesson, setIsShowLesson] = useState<boolean>(false)

    return (
        <div>
            <div
                className="flex cursor-pointer items-center justify-between rounded-md bg-softGrey px-6 py-4"
                onClick={() => setIsShowLesson(!isShowLesson)}
            >
                <div className="flex items-center gap-2">
                    {isShowLesson ? (
                        <AiOutlineMinus className="size-4 text-primary" />
                    ) : (
                        <FiPlus className="size-4 text-primary" />
                    )}
                    <h5 className="text-base font-medium">{module.title}</h5>
                </div>
                <p>{module.lessons.length} bài học</p>
            </div>
            <div className="py-2 opacity-75">
                {isShowLesson &&
                    module?.lessons?.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b border-grey/50 px-6 py-3"
                        >
                            <div className="flex items-center gap-2">
                                {item.content_type === 'video' && (
                                    <MdOutlinePlayCircleOutline className="size-5 text-primary" />
                                )}
                                {item.content_type === 'document' && <IoIosDocument className="size-5 text-primary" />}
                                <h6 className="text-sm font-semibold">{item.title}</h6>
                            </div>
                            {item.content_type === 'document' && '01 phút'}
                            {formatDuration(item.duration)}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default CourseModule
