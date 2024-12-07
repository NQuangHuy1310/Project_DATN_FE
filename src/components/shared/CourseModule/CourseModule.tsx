import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoIosDocument } from 'react-icons/io'
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlinePlayCircleOutline } from 'react-icons/md'

import { IModule } from '@/types/course/course.ts'
import { formatDuration } from '@/lib'
import { HiQuestionMarkCircle } from 'react-icons/hi'
import LessonPreview from '@/components/shared/LessonPreview/LessonPreview'

const CourseModule = ({ module }: { module: IModule }) => {
    const [isShowLesson, setIsShowLesson] = useState<boolean>(false)
    const [selectedLesson, setSelectedLesson] = useState<any>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openLessonDialog = (lesson: number) => {
        setSelectedLesson(lesson)
        setIsDialogOpen(true)
    }

    const closeLessonDialog = () => {
        setSelectedLesson(null)
        setIsDialogOpen(false)
    }

    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil((words / wordsPerMinute) * 60)
    }

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
                <p>{module.lessons.length + 1} bài học</p>
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
                            <div className="flex items-center gap-4">
                                {item.is_preview == 1 && (
                                    <span
                                        onClick={() => openLessonDialog(item.id)}
                                        className="cursor-pointer text-xs font-semibold text-primary"
                                    >
                                        Xem trước
                                    </span>
                                )}
                                {item.content_type === 'document' &&
                                    `${calculateReadingTime(item.lessonable.content!)} phút`}
                                {formatDuration(item.lessonable.duration!)}
                            </div>
                        </div>
                    ))}
                {isShowLesson && module.quiz && (
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-2">
                            <HiQuestionMarkCircle className="size-5 text-primary" />
                            <h6 className="text-sm font-semibold">{module.quiz.title}</h6>
                        </div>
                    </div>
                )}
            </div>
            <LessonPreview isOpen={isDialogOpen} onClose={closeLessonDialog} idLesson={selectedLesson} />
        </div>
    )
}

export default CourseModule
