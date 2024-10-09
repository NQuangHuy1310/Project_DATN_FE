import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Button } from '@/components/ui/button'

import LessonOptions from '@/components/shared/CourseContent/LessonOptions'
import LessonItem from '@/components/shared/CourseContent/LessonItem'

const CourseContent = () => {
    const [isAddNew, setIsAddNew] = useState(false)

    return (
        <div className="rounded-md border-[1px] border-grey bg-softGrey p-4">
            <div className="flex flex-col gap-3">
                <h5 className="text-base font-semibold">Phần chưa xuất bản: "Tên phần"</h5>

                {/* LessonItem */}
                <LessonItem />
                <LessonItem />
                <LessonItem />

                {isAddNew && <LessonOptions handleClose={setIsAddNew} />}

                {!isAddNew && (
                    <div>
                        <Button
                            className="flex items-center gap-2"
                            variant="outline"
                            onClick={() => setIsAddNew(!isAddNew)}
                        >
                            <FiPlus />
                            Mục trong chương trình
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseContent
