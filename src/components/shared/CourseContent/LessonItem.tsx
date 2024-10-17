import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import { IoIosDocument } from 'react-icons/io'
import { FaRegCirclePlay } from 'react-icons/fa6'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'

import { ILesson } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/CourseContent/Dialog/ConfirmDialog'
import { useDeleteLessonDoc } from '@/app/hooks/instructors'

const LessonItem = ({ title, content_type, id }: ILesson) => {
    const { mutateAsync: deleteLessonDoc, isPending } = useDeleteLessonDoc()
    const [isOpenDialog, setIsOpenDialog] = useState(false)

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
                        <Button size="icon" variant="ghost">
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
