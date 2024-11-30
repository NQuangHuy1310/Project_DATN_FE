import { useEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { IoIosDocument } from 'react-icons/io'
import { useSortable } from '@dnd-kit/sortable'
import { FaExchangeAlt } from 'react-icons/fa'
import { FaPen, FaRegTrashAlt, FaCode } from 'react-icons/fa'
import { FaBars, FaRegCirclePlay, FaFileCircleCheck } from 'react-icons/fa6'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog/ConfirmDialog.tsx'
import { useDeleteLessonCoding, useDeleteLessonDoc, useDeleteLessonVideo } from '@/app/hooks/instructors'
import LessonVideo from '@/components/shared/CourseContent/Lesson/LessonVideo'
import LessonDocument from '@/components/shared/CourseContent/Lesson/LessonDocument'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectItem } from '@/components/ui/select'
import { showMessage } from '@/lib'
import LessonCoding from '@/components/shared/CourseContent/Lesson/LessonCoding/LessonCoding'

interface LessonItemProps {
    lesson: ILesson
    canEdit: boolean
    moduleId: number
}

const LessonItem = ({ lesson, canEdit }: LessonItemProps) => {
    const { id, content_type, title, lessonable } = lesson
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: lesson.position,
        data: { ...lesson }
    })
    const { mutateAsync: deleteLessonDoc, isPending } = useDeleteLessonDoc()
    const { mutateAsync: deleteLessonVideo } = useDeleteLessonVideo()
    const { mutateAsync: deleteLessonCoding } = useDeleteLessonCoding()

    const [lessonId, setLessonId] = useState<number>(id)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isEditingDocument, setIsEditingDocument] = useState(false)
    const [isEditingVideo, setIsEditingVideo] = useState(false)
    const [isEditingCoding, setIsEditingCoding] = useState(false)
    const [isSelectingLessonType, setIsSelectingLessonType] = useState(false)
    const [selectedLessonType, setSelectedLessonType] = useState<'document' | 'quiz' | 'video' | 'coding'>(content_type)

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        willChange: 'transform, opacity'
    }

    const handleDeleteLesson = async () => {
        if (canEdit) {
            if (content_type === 'document') {
                await deleteLessonDoc(id)
            } else if (content_type === 'video') {
                await deleteLessonVideo(id)
            } else if (content_type === 'coding') {
                await deleteLessonCoding(id)
            }
            setIsOpenDialog(false)
        } else showMessage()
    }

    const handleChangeSelectedLessonType = (value: 'document' | 'quiz' | 'video') => {
        if (canEdit) {
            if (selectedLessonType !== content_type) {
                setIsSelectingLessonType(false)
                if (value === 'document') setIsEditingDocument(true)
                if (value === 'video') setIsEditingVideo(true)
            } else {
                setSelectedLessonType(value)
                setIsSelectingLessonType(true)
            }
        } else showMessage()
    }

    const handleEditLesson = (lessonType: 'document' | 'quiz' | 'video' | 'coding', lessonID: number) => {
        if (lessonType === 'document') setIsEditingDocument(!isEditingDocument)
        if (lessonType === 'video') setIsEditingVideo(!isEditingVideo)
        if (lessonType === 'coding') setIsEditingCoding(!isEditingCoding)
        setLessonId(lessonID)
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
                        {content_type === 'coding' && <FaCode className="size-5 text-primary" />}
                        <h4 className="text-base font-medium">
                            {content_type === 'coding' ? 'Bài tập' : 'Bài giảng'}
                            {': '}
                            <strong>{title}</strong>
                        </h4>
                        {lessonable.resourse_path && (
                            <div className="flex items-center gap-2">
                                {' - '}
                                <FaFileCircleCheck className="size-4 text-secondaryGreen" />
                                <p className="text-sm font-semibold">File đính kèm</p>
                            </div>
                        )}
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
                                handleEditLesson(content_type, id)
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
                <LessonDocument
                    lessonId={lessonId}
                    courseId={id}
                    setIsEditLesson={setIsEditingDocument}
                    canEdit={canEdit}
                />
            )}

            {/* Handle edit lesson video */}
            {isEditingVideo && !isSelectingLessonType && (
                <LessonVideo lessonId={lessonId} courseId={id} setIsEditLesson={setIsEditingVideo} canEdit={canEdit} />
            )}

            {/* Handle edit lesson coding */}
            {isEditingCoding && !isSelectingLessonType && (
                <LessonCoding open={isEditingCoding} setOpenDialog={setIsEditingCoding} lessonId={lessonId} />
            )}

            {/* Change lesson type */}
            {selectedLessonType === 'document' && isSelectingLessonType && (
                <LessonDocument
                    lessonId={lessonId}
                    courseId={id}
                    setIsSelectingLessonType={setIsSelectingLessonType}
                    isSelectingLessonType={isSelectingLessonType}
                    canEdit={canEdit}
                />
            )}

            {/* Change lesson type */}
            {selectedLessonType === 'video' && isSelectingLessonType && (
                <LessonVideo
                    lessonId={lessonId}
                    courseId={id}
                    setIsSelectingLessonType={setIsSelectingLessonType}
                    isSelectingLessonType={isSelectingLessonType}
                    canEdit={canEdit}
                />
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
