/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { MdOutlineQuiz } from 'react-icons/md'
import { useSortable } from '@dnd-kit/sortable'
import { FaRegRectangleList } from 'react-icons/fa6'
import { FaAngleDown, FaAngleUp, FaBars, FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { IModule } from '@/types/instructor'
import { Button } from '@/components/ui/button.tsx'
import { selectedModule } from '@/views/instructor/Course/CreateCourse/Curriculum.tsx'
import CourseLessons from '@/components/shared/CourseContent/CourseLessons.tsx'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useDeleteModule } from '@/app/hooks/instructors'
import { showMessage } from '@/lib'

interface CourseModulesProps {
    module: IModule
    canEdit: boolean
    isShowContent: boolean
    toggleContentVisibility: (moduleId: number) => void
    handleSetSelectedData: (selectedData: selectedModule) => void
}

const CourseModules = ({
    module,
    canEdit,
    isShowContent,
    toggleContentVisibility,
    handleSetSelectedData
}: CourseModulesProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: module.position,
        data: { ...module }
    })
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>('')
    const { mutateAsync: deleteModule, isPending } = useDeleteModule()

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        willChange: 'transform, opacity'
    }

    const handleDeleteModule = async () => {
        if (canEdit) {
            await deleteModule(selectedId.toString())
            setConfirmDialog(false)
        } else showMessage()
    }

    return (
        <div
            className="flex flex-col gap-3 rounded-md border border-grey bg-softGrey p-4"
            ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <div className="group flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-3">
                        <h5 className="text-base font-semibold">Tên chương: {module.title}</h5>
                        <div className="flex items-center gap-3">
                            {module.total_lessons > 0 && (
                                <>
                                    {' - '}
                                    <h6 className="flex items-center gap-1 text-base font-semibold">
                                        <FaRegRectangleList className="size-5 text-primary" /> {module.total_lessons}{' '}
                                        Bài học
                                    </h6>
                                </>
                            )}
                            {module.quiz && (
                                <>
                                    {' | '}
                                    {module.quiz && (
                                        <h6 className="flex items-center gap-1 text-base font-semibold">
                                            <MdOutlineQuiz className="size-5 text-secondaryGreen" /> Đã Có Bài tập
                                        </h6>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hidden gap-2 group-hover:flex">
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                                handleSetSelectedData({
                                    name: module.title,
                                    description: module.title,
                                    id: module.id.toString()
                                })
                                setSelectedId(module.id.toString())
                            }}
                        >
                            <FaPen className="size-4 cursor-pointer" />
                        </Button>

                        <Button size="icon" variant="outline">
                            <FaRegTrashAlt
                                className="size-4 cursor-pointer hover:text-black"
                                onClick={() => {
                                    setSelectedId(module.id.toString())
                                    setConfirmDialog(true)
                                }}
                            />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => toggleContentVisibility(module.id)}
                    >
                        {isShowContent ? <FaAngleUp className="size-4" /> : <FaAngleDown className="size-4" />}
                    </Button>
                    <Button size="icon" variant="outline" className="cursor-all-scroll" {...listeners}>
                        <FaBars className="size-4" />
                    </Button>
                </div>
            </div>

            <CourseLessons
                id={module.id}
                isShowContent={isShowContent}
                lessons={module.lessons}
                quiz={module.quiz}
                canEdit={canEdit}
            />

            {/* Confirm dialog */}
            <ConfirmDialog
                isPending={isPending}
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                handleDelete={handleDeleteModule}
                title="Xoá chương trong khoá học"
                description="Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?"
            />
        </div>
    )
}

export default CourseModules
