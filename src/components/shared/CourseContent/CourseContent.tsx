/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { closestCorners, DndContext } from '@dnd-kit/core'
import { FaBars, FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import { ILesson, ILessonQuiz } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import { useDeleteModule } from '@/app/hooks/instructors'
import LessonItem from '@/components/shared/CourseContent/LessonItem'
import LessonOptions from '@/components/shared/CourseContent/LessonOptions'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog'
import QuizItem from '@/components/shared/CourseContent/QuizItem'

interface CourseContentProps {
    name: string
    id: number
    lessons: ILesson[]
    quiz: ILessonQuiz
    description: string
    handleSelectedItem: (item: { name: string; description: string; id: string }) => void
}

const CourseContent = ({ name, id, lessons, handleSelectedItem, description, quiz }: CourseContentProps) => {
    const { mutateAsync: deleteModule, isPending } = useDeleteModule()

    const [isAddNew, setIsAddNew] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [isShowContent, setIsShowContent] = useState(true)
    const [lessonData, setLessonData] = useState<ILesson[]>(lessons)

    const handleDeleteModule = async () => {
        await deleteModule(id.toString())
        setConfirmDialog(false)
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (active.id !== over.id) {
            const newItems = [...lessonData]
            const activeIndex = lessonData.findIndex((item) => item.id === active.id)
            const overIndex = lessonData.findIndex((item) => item.id === over.id)

            const temp = newItems[activeIndex]
            newItems[activeIndex] = newItems[overIndex]
            newItems[overIndex] = temp

            setLessonData(newItems)
        }
    }

    return (
        <>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <SortableContext items={lessons?.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
                    <div className="rounded-md border border-grey bg-softGrey p-4">
                        <div className="flex flex-col gap-5">
                            <div className="group flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h5 className="text-base font-semibold">Tên chương: {name}</h5>
                                    <div className="hidden gap-4 group-hover:flex">
                                        <div
                                            className=""
                                            onClick={() =>
                                                handleSelectedItem({
                                                    name: name,
                                                    description: description,
                                                    id: id.toString()
                                                })
                                            }
                                        >
                                            <FaPen className="size-4 cursor-pointer" />
                                        </div>

                                        <FaRegTrashAlt
                                            className="size-4 cursor-pointer hover:text-black"
                                            onClick={() => setConfirmDialog(true)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="cursor-pointer"
                                        onClick={() => setIsShowContent(!isShowContent)}
                                    >
                                        {isShowContent ? (
                                            <FaAngleUp className="size-4" />
                                        ) : (
                                            <FaAngleDown className="size-4" />
                                        )}
                                    </Button>
                                    <Button size="icon" variant="outline" className="cursor-all-scroll">
                                        <FaBars className="size-4" />
                                    </Button>
                                </div>
                            </div>

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

export default CourseContent
