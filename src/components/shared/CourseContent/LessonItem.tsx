import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import { IoIosDocument } from 'react-icons/io'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog'
import { useDeleteLessonDoc, useGetLessonDetail } from '@/app/hooks/instructors'
import LessonDocument from '@/components/shared/CourseContent/LessonDocument'
import LessonVideo from '@/components/shared/CourseContent/LessonVideo'

interface LessonItemProps {
    lesson: ILesson
    moduleId: number
}

const LessonItem = ({ lesson, moduleId }: LessonItemProps) => {
    const { id, content_type, title } = lesson
    const { data } = useGetLessonDetail(id)
    const { mutateAsync: deleteLessonDoc, isPending } = useDeleteLessonDoc()
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isEditLessonDoc, setIsEditLesson] = useState(false)
    const [isEditLessonVideo, setIsEditLessonVideo] = useState(false)

    const handleDeleteLesson = async () => {
        if (content_type === 'document') {
            await deleteLessonDoc(id)
            setIsOpenDialog(false)
        } else if (content_type === 'video') {
            // handle delete
        }
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2.5">
                <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex h-[36px] items-center justify-start gap-2">
                        {content_type === 'document' && <IoIosDocument className="size-5 text-primary" />}
                        {content_type === 'video' && <FaRegCirclePlay className="size-5 text-primary" />}
                        <h4 className="text-base font-medium">
                            Tên bài giảng: <strong>{title}</strong>
                        </h4>
                    </div>
                    <div className="block gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                if (content_type === 'document') setIsEditLesson(!isEditLessonDoc)
                                if (content_type === 'video') setIsEditLessonVideo(!isEditLessonVideo)
                            }}
                        >
                            <FaPen className="size-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsOpenDialog(true)}>
                            <FaRegTrashAlt className="size-4" />
                        </Button>
                    </div>
                </div>
                <div className="block cursor-all-scroll">
                    <FaBars className="size-4" />
                </div>
            </div>

            {/* Handle edit lesson doc */}
            {isEditLessonDoc && (
                <LessonDocument
                    isEdit={isEditLessonDoc}
                    lessonData={data}
                    moduleId={moduleId}
                    courseId={id}
                    setIsEditLesson={setIsEditLesson}
                />
            )}

            {/* Handle edit lesson video */}
            {isEditLessonVideo && (
                <LessonVideo moduleId={moduleId} lessonData={data!} setIsEditLesson={setIsEditLessonVideo} />
            )}

            {/* Confirm dialog */}
            <ConfirmDialog
                isPending={isPending}
                confirmDialog={isOpenDialog}
                setConfirmDialog={setIsOpenDialog}
                handleDeleteModule={handleDeleteLesson}
                title="Xác nhận xoá bài giảng"
                description="Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?"
            />
        </>
    )
}

export default LessonItem
