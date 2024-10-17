/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaBars, FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import { useDeleteModule } from '@/app/hooks/instructors'
import LessonItem from '@/components/shared/CourseContent/LessonItem'
import LessonOptions from '@/components/shared/CourseContent/LessonOptions'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog'

interface CourseContentProps {
    name: string
    id: number
    lessons: ILesson[]
    description: string
    handleSelectedItem: (item: { name: string; description: string; id: string }) => void
}

const CourseContent = ({ name, id, lessons, handleSelectedItem, description }: CourseContentProps) => {
    const { mutateAsync: deleteModule, isPending } = useDeleteModule()

    const [confirmDialog, setConfirmDialog] = useState(false)
    const [isAddNew, setIsAddNew] = useState(false)

    const handleDeleteModule = async () => {
        await deleteModule(id.toString())
        setConfirmDialog(false)
    }

    return (
        <>
            <div className="rounded-md border border-grey bg-softGrey p-4">
                <div className="flex flex-col gap-3">
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

                        <div className="cursor-all-scroll">
                            <FaBars className="size-4" />
                        </div>
                    </div>

                    {/* Hiển thị LessonItem */}
                    {lessons &&
                        lessons.length > 0 &&
                        lessons.map((item) => {
                            return <LessonItem key={item.id} {...item} />
                        })}

                    {/* Hiển thị LessonOptions nếu đang thêm mới */}
                    {isAddNew && <LessonOptions handleClose={setIsAddNew} moduleId={id} />}

                    {/* Nút thêm mục mới */}
                    {!isAddNew && (
                        <div>
                            <Button
                                className="flex items-center gap-2"
                                variant="outline"
                                onClick={() => setIsAddNew(true)}
                            >
                                <FiPlus />
                                Mục trong chương trình
                            </Button>
                        </div>
                    )}
                </div>
            </div>

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
