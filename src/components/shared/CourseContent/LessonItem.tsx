import { useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { IoIosDocument } from 'react-icons/io'
import { useSortable } from '@dnd-kit/sortable'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { FaBars, FaRegCirclePlay } from 'react-icons/fa6'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog'
import { useDeleteLessonDoc, useDeleteLessonVideo } from '@/app/hooks/instructors'
import LessonDocument from '@/components/shared/CourseContent/LessonDocument'
import LessonVideo from '@/components/shared/CourseContent/LessonVideo'

interface LessonItemProps {
    lesson: ILesson
    moduleId: number
}

const LessonItem = ({ lesson }: LessonItemProps) => {
    const { id, content_type, title } = lesson
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: lesson.position,
        data: { ...lesson }
    })
    const { mutateAsync: deleteLessonDoc, isPending } = useDeleteLessonDoc()
    const { mutateAsync: deleteLessonVideo } = useDeleteLessonVideo()
    const [lessonId, setLessonId] = useState<number>(id)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isEditLessonDoc, setIsEditLesson] = useState(false)
    const [isEditLessonVideo, setIsEditLessonVideo] = useState(false)

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        willChange: 'transform, opacity'
    }

    const handleDeleteLesson = async () => {
        if (content_type === 'document') {
            await deleteLessonDoc(id)
        } else if (content_type === 'video') {
            await deleteLessonVideo(id)
        }
        setIsOpenDialog(false)
    }

    return (
        <>
            <div
                className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2.5"
                ref={setNodeRef}
                style={dndKitColumnStyles}
                {...attributes}
            >
                <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex h-[36px] items-center justify-start gap-2">
                        {content_type === 'document' && <IoIosDocument className="size-5 text-primary" />}
                        {content_type === 'video' && <FaRegCirclePlay className="size-5 text-primary" />}
                        <h4 className="text-base font-medium">
                            Bài giảng: <strong>{title}</strong>
                        </h4>
                    </div>
                    <div className="block gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                if (content_type === 'document') setIsEditLesson(!isEditLessonDoc)
                                if (content_type === 'video') setIsEditLessonVideo(!isEditLessonVideo)
                                setLessonId(id)
                            }}
                        >
                            <FaPen className="size-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsOpenDialog(true)}>
                            <FaRegTrashAlt className="size-4" />
                        </Button>
                    </div>
                </div>
                <Button
                    className="flex cursor-all-scroll items-center justify-center"
                    {...listeners}
                    size="icon"
                    variant="ghost"
                >
                    <FaBars className="size-4" />
                </Button>
            </div>

            {/* Handle edit lesson doc */}
            {isEditLessonDoc && <LessonDocument lessonId={lessonId} courseId={id} setIsEditLesson={setIsEditLesson} />}

            {/* Handle edit lesson video */}
            {isEditLessonVideo && (
                <LessonVideo lessonId={lessonId} courseId={id} setIsEditLesson={setIsEditLessonVideo} />
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
