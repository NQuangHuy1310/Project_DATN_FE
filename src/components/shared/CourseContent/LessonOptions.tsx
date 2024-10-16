/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import LessonVideo from '@/components/shared/CourseContent/LessonVideo'
import LessonCoding from '@/components/shared/CourseContent/LessonCoding'
import LessonQuizzes from '@/components/shared/CourseContent/LessonQuizzes'
import LessonDocument from '@/components/shared/CourseContent/LessonDocument'
import { lessonOptions } from '@/constants'

type lessonTypes = 'video' | 'document' | 'quizzes' | 'coding'

const LessonOptions = ({ handleClose, moduleId }: { handleClose: (value: boolean) => void; moduleId: number }) => {
    const [isShowLesson, setIsShowLesson] = useState(false)
    const [lessonType, setLessonType] = useState<lessonTypes | undefined>(undefined)

    return (
        <div className="flex flex-col gap-5">
            <div className="relative flex items-center justify-start gap-5 rounded-md border-[1px] border-dashed border-black bg-white px-7 py-3">
                {lessonOptions.map((item, index) => (
                    <div key={index}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => {
                                setLessonType(item.type as lessonTypes)
                                setIsShowLesson(true)
                            }}
                        >
                            <FiPlus />
                            {item.name}
                        </Button>
                    </div>
                ))}
                <div className="absolute right-2 top-2" onClick={() => handleClose(false)}>
                    <IoClose className="size-5 cursor-pointer" />
                </div>
            </div>

            {isShowLesson && (
                <>
                    {lessonType === 'video' && <LessonVideo moduleId={moduleId} handleHiddenLesson={setIsShowLesson} />}
                    {lessonType === 'document' && (
                        <LessonDocument moduleId={moduleId} handleHiddenLesson={setIsShowLesson} />
                    )}
                    {lessonType === 'quizzes' && <LessonQuizzes />}
                    {lessonType === 'coding' && <LessonCoding />}
                </>
            )}
        </div>
    )
}

export default LessonOptions
