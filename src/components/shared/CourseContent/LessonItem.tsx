import { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { IoIosDocument } from 'react-icons/io'
import { useSortable } from '@dnd-kit/sortable'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { FaBars, FaRegCirclePlay } from 'react-icons/fa6'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog.tsx'
import { useDeleteLessonDoc, useDeleteLessonVideo } from '@/app/hooks/instructors'
import LessonDocument from '@/components/shared/CourseContent/LessonDocument'
import LessonVideo from '@/components/shared/CourseContent/LessonVideo'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectItem } from '@/components/ui/select'

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
    const [isEditingDocument, setIsEditingDocument] = useState(false)
    const [isEditingVideo, setIsEditingVideo] = useState(false)
    const [isSelectingLessonType, setIsSelectingLessonType] = useState(false)
    const [selectedLessonType, setSelectedLessonType] = useState<'document' | 'quiz' | 'video'>(content_type)

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

    const handleChangeSelectedLessonType = (value: 'document' | 'quiz' | 'video') => {
        setSelectedLessonType(value)
        if (selectedLessonType !== content_type) {
            setIsSelectingLessonType(false)
            if (value === 'document') setIsEditingDocument(true)
            if (value === 'video') setIsEditingVideo(true)
        } else {
            setIsSelectingLessonType(true)
        }
    }

    useEffect(() => {
        if (!isEditingDocument && !isEditingVideo) {
            setSelectedLessonType(content_type)
        }
    }, [isEditingDocument, isEditingVideo, content_type])

    return (
        <>
            <div
                className="flex items-center justify-between gap-1 rounded-lg bg-white px-4 py-2.5"
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
                    <div className="flex items-center gap-2">
                        <Select value={selectedLessonType} onValueChange={handleChangeSelectedLessonType}>
                            <SelectTrigger className="flex h-[36px] w-[36px] items-center justify-center gap-0 border-none">
                                <Button size="icon" variant="ghost">
                                    <FaExchangeAlt className="size-4" />
                                </Button>
                            </SelectTrigger>
                            <SelectContent align="end" className="p-1">
                                <SelectGroup>
                                    <SelectItem value="document">Tài liệu</SelectItem>
                                    <SelectItem value="video">Video bài giảng</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                if (content_type === 'document') setIsEditingDocument(!isEditingDocument)
                                if (content_type === 'video') setIsEditingVideo(!isEditingVideo)
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
            {isEditingDocument && !isSelectingLessonType && (
                <LessonDocument lessonId={lessonId} courseId={id} setIsEditLesson={setIsEditingDocument} />
            )}

            {/* Handle edit lesson video */}
            {isEditingVideo && !isSelectingLessonType && (
                <LessonVideo lessonId={lessonId} courseId={id} setIsEditLesson={setIsEditingVideo} />
            )}

            {selectedLessonType === 'document' && isSelectingLessonType && (
                <LessonDocument lessonId={id} courseId={id} setIsSelectingLessonType={setIsSelectingLessonType} />
            )}

            {selectedLessonType === 'video' && isSelectingLessonType && (
                <LessonVideo lessonId={id} courseId={id} setIsSelectingLessonType={setIsSelectingLessonType} />
            )}

            {/* Confirm dialog for delete */}
            <ConfirmDialog
                isPending={isPending}
                confirmDialog={isOpenDialog}
                setConfirmDialog={setIsOpenDialog}
                handleDelete={handleDeleteLesson}
                title="Xác nhận xoá bài giảng"
                description="Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?"
            />
        </>
    )
}

export default LessonItem
