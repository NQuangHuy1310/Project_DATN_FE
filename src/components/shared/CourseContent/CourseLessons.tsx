import { FiPlus } from 'react-icons/fi'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { closestCorners, DndContext } from '@dnd-kit/core'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { ILesson, ILessonQuiz } from '@/types/instructor'
import { Button } from '@/components/ui/button.tsx'
import QuizItem from '@/components/shared/CourseContent/QuizItem.tsx'
import LessonItem from '@/components/shared/CourseContent/LessonItem.tsx'
import LessonOptions from '@/components/shared/CourseContent/LessonOptions.tsx'
import { useDeleteModule, useUpdatePositionLesson } from '@/app/hooks/instructors'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog.tsx'

interface CourseModuleProps {
    id: number
    isShowContent: boolean
    confirmDialog: boolean
    setConfirmDialog: Dispatch<SetStateAction<boolean>>
    lessons: ILesson[]
    quiz: ILessonQuiz
}

const CourseLessons = ({ id, lessons, quiz, isShowContent, confirmDialog, setConfirmDialog }: CourseModuleProps) => {
    const { mutateAsync: deleteModule, isPending } = useDeleteModule()
    const { mutateAsync: updatePosition } = useUpdatePositionLesson()

    const [isAddNew, setIsAddNew] = useState(false)
    const [originalLessonData, setOriginalLessonData] = useState<ILesson[]>(lessons)
    const [lessonData, setLessonData] = useState<ILesson[]>(lessons)

    const handleDeleteModule = async () => {
        await deleteModule(id.toString())
        setConfirmDialog(false)
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event
        const moduleId: number = active.data.current.id_module

        if (active.data.current.position !== over.data.current.position) {
            const newItems = [...lessonData]
            const activeIndex = lessonData.findIndex((item) => item.position === active.data.current.position)
            const overIndex = lessonData.findIndex((item) => item.position === over.data.current.position)

            if (activeIndex !== -1 && overIndex !== -1) {
                const temp = newItems[activeIndex]
                newItems[activeIndex] = newItems[overIndex]
                newItems[overIndex] = temp

                newItems.forEach((item, index) => {
                    item.position = index + 1
                })

                setLessonData(newItems)

                const payload = {
                    lessons: newItems.map((item) => ({
                        id: item.id,
                        position: item.position
                    })),
                    _method: 'PUT'
                }
                await updatePosition([moduleId, payload])
            }
        }
    }

    useEffect(() => {
        if (lessons.length > 0 && JSON.stringify(lessons) !== JSON.stringify(originalLessonData)) {
            setOriginalLessonData(lessons)
            setLessonData(lessons)
        }
    }, [lessons, originalLessonData])

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={lessons?.map((c) => c.position)} strategy={horizontalListSortingStrategy}>
                    <div className="flex flex-col gap-5">
                        {/* Hiển thị LessonItem */}
                        {isShowContent &&
                            lessonData &&
                            lessonData.length > 0 &&
                            lessonData.map((item) => {
                                return <LessonItem key={item.id} lesson={item} moduleId={id} />
                            })}

                        {isShowContent && quiz && <QuizItem lesson={quiz} moduleId={id} />}

                        {/* Hiển thị LessonOptions nếu đang thêm mới */}
                        {isAddNew && <LessonOptions handleClose={setIsAddNew} moduleId={id} />}

                        {/* Nút thêm mục mới */}
                        {!isAddNew && (
                            <div>
                                <Button
                                    className="flex items-center gap-2"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddNew(true)
                                    }}
                                >
                                    <FiPlus />
                                    Mục trong chương trình
                                </Button>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Confirm dialog */}
            <ConfirmDialog
                isPending={isPending}
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                handleDeleteModule={handleDeleteModule}
                title="Xoá chương trong khoá học"
                description="Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?"
            />
        </>
    )
}

export default CourseLessons
