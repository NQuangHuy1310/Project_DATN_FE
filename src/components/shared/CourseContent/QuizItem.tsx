import { useState } from 'react'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { FaRegCircleQuestion } from 'react-icons/fa6'

import { ILessonQuiz } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useDeleteLessonQuiz, useGetLessonQuiz } from '@/app/hooks/instructors'
import DialogAddQuestion from '@/components/shared/CourseContent/Dialog/DialogAddQuestion'
import LessonQuizzes from '@/components/shared/CourseContent/LessonQuizzes'

interface QuizItemProps {
    lesson: ILessonQuiz
    canEdit: boolean
    moduleId: number
}

const QuizItem = ({ lesson, moduleId, canEdit }: QuizItemProps) => {
    const { title } = lesson
    const { data } = useGetLessonQuiz(moduleId)
    const { mutateAsync: deleteLessonQuiz, isPending } = useDeleteLessonQuiz()

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false)
    const [isEditQuiz, setIsEditQuiz] = useState(false)

    const handleDeleteLesson = async () => {
        await deleteLessonQuiz(lesson.id)
        setIsOpenDialog(false)
    }

    return (
        <>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-white px-4 py-2.5">
                <div className="flex w-full items-start justify-between gap-4">
                    <div className="flex h-[36px] items-center justify-start gap-2">
                        <FaRegCircleQuestion className="size-5 text-primary" />
                        <div className="flex items-center gap-2 text-base font-medium">
                            <h4>
                                Bài tập: <strong>{title}</strong>
                            </h4>
                            {'-'}
                            <h4>
                                Số lượng câu hỏi: <strong>{data?.quiz?.questions.length}</strong>
                            </h4>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsOpenAddDialog(true)}
                            disabled={!canEdit}
                        >
                            Thêm câu hỏi
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsEditQuiz(!isEditQuiz)}>
                            <FaPen className="size-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setIsOpenDialog(true)}>
                            <FaRegTrashAlt className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Confirm dialog */}
            <ConfirmDialog
                isPending={isPending}
                confirmDialog={isOpenDialog}
                setConfirmDialog={setIsOpenDialog}
                handleDelete={handleDeleteLesson}
                title="Xác nhận xoá bài tập"
                description="Bạn sắp xóa một chương trình giảng dạy. Bạn có chắc chắn muốn tiếp tục không?"
            />

            {/* Dialog add question */}
            <DialogAddQuestion openDialog={isOpenAddDialog} setOpenDialog={setIsOpenAddDialog} quizId={lesson.id!} />

            {/* LessonQuizzes */}
            {isEditQuiz && <LessonQuizzes moduleId={moduleId!} canEdit={canEdit} />}
        </>
    )
}

export default QuizItem
