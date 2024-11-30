/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import LessonVideo from '@/components/shared/CourseContent/Lesson/LessonVideo'
import LessonCoding from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCoding'
import LessonQuizzes from '@/components/shared/CourseContent/Lesson/LessonQuizzes'
import LessonDocument from '@/components/shared/CourseContent/Lesson/LessonDocument'
import { lessonOptions } from '@/constants'
import { toast } from 'sonner'

type lessonTypes = 'video' | 'document' | 'quizzes' | 'coding'

interface LessonOptionsProps {
    handleClose: (value: boolean) => void
    moduleId: number
    isHasQuiz?: boolean
}

const LessonOptions = ({ handleClose, moduleId, isHasQuiz }: LessonOptionsProps) => {
    const [isShowLesson, setIsShowLesson] = useState(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [lessonType, setLessonType] = useState<lessonTypes | undefined>(undefined)

    const handleClickButton = (type: lessonTypes) => {
        if (isHasQuiz && type === 'quizzes') {
            toast.error('Chương học này đã có bài tập không thể thêm bài tập nữa!')
        } else if (type === 'coding') {
            setOpenDialog(true)
        }

        setLessonType(type)
        setIsShowLesson(true)
    }

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
                                handleClickButton(item.type as lessonTypes)
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
                    {lessonType === 'video' && (
                        <LessonVideo moduleId={moduleId} handleHiddenLesson={setIsShowLesson} canEdit={true} />
                    )}
                    {lessonType === 'document' && (
                        <LessonDocument moduleId={moduleId} handleHiddenLesson={setIsShowLesson} canEdit={true} />
                    )}
                    {lessonType === 'quizzes' && !isHasQuiz && (
                        <LessonQuizzes moduleId={moduleId} handleHiddenLesson={setIsShowLesson} canEdit={true} />
                    )}
                    {lessonType === 'coding' && (
                        <LessonCoding moduleId={moduleId} open={openDialog} setOpenDialog={setOpenDialog} />
                    )}
                </>
            )}
        </div>
    )
}

export default LessonOptions
