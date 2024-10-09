import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import LessonVideo from '@/components/shared/CourseContent/LessonVideo'
import LessonCoding from '@/components/shared/CourseContent/LessonCoding'
import LessonOptions from '@/components/shared/CourseContent/LessonOptions'
import LessonQuizzes from '@/components/shared/CourseContent/LessonQuizzes'
import LessonDocument from '@/components/shared/CourseContent/LessonDocument'

type lessonTypes = 'video' | 'document' | 'quizzes' | 'coding'

const CourseContent = () => {
    const [isAddNew, setIsAddNew] = useState(false)
    const [lessonType, setLessonType] = useState<lessonTypes | undefined>(undefined)

    const handleChangeLessonType = (type: lessonTypes | undefined) => {
        setIsAddNew(false)
        setLessonType(type)
    }

    return (
        <div className="rounded-md border-[1px] border-grey bg-softGrey p-4">
            <div className="flex flex-col gap-3">
                <h5 className="text-base font-semibold">Phần chưa xuất bản: "Tên phần"</h5>

                {/* LessonItem */}

                {isAddNew && <LessonOptions setLessonType={handleChangeLessonType} />}

                {!isAddNew && (
                    <>
                        {lessonType === 'video' && <LessonVideo />}
                        {lessonType === 'document' && <LessonDocument />}
                        {lessonType === 'quizzes' && <LessonQuizzes />}
                        {lessonType === 'coding' && <LessonCoding />}
                    </>
                )}

                <div className="">
                    <Button
                        className="flex items-center gap-2"
                        variant="outline"
                        onClick={() => setIsAddNew(!isAddNew)}
                    >
                        <FiPlus />
                        Mục trong chương trình
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseContent
