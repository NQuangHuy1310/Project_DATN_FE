/* eslint-disable no-unused-vars */
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Dispatch, SetStateAction } from 'react'
import { FaAngleDown, FaAngleUp, FaBars, FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { IModule } from '@/types/instructor'
import { Button } from '@/components/ui/button.tsx'
import { selectedModule } from '@/views/instructor/Course/CreateCourse/Curriculum.tsx'
import CourseLessons from '@/components/shared/CourseContent/CourseLessons.tsx'

interface CourseModulesProps {
    module: IModule
    isShowContent: boolean
    confirmDialog: boolean
    setConfirmDialog: Dispatch<SetStateAction<boolean>>
    toggleContentVisibility: (moduleId: number) => void
    handleSetSelectedData: (selectedData: selectedModule) => void
}

const CourseModules = ({
    module,
    isShowContent,
    setConfirmDialog,
    confirmDialog,
    toggleContentVisibility,
    handleSetSelectedData
}: CourseModulesProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: module.position,
        data: { ...module }
    })

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        willChange: 'transform, opacity'
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
                    <h5 className="text-base font-semibold">Tên chương: {module.title}</h5>
                    <div className="hidden gap-4 group-hover:flex">
                        <div
                            onClick={() =>
                                handleSetSelectedData({
                                    name: module.title,
                                    description: module.title,
                                    id: module.id.toString()
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
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                lessons={module.lessons}
                quiz={module.quiz}
            />
        </div>
    )
}

export default CourseModules
