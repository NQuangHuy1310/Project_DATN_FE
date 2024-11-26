import Papa from 'papaparse'
import { toast } from 'sonner'
import { FaFileDownload } from 'react-icons/fa'
import { ChangeEvent, useRef, useState } from 'react'
import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { FaRegCircleQuestion } from 'react-icons/fa6'

import { ILessonQuiz } from '@/types/instructor'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useCreateQuestion, useDeleteLessonQuiz, useGetLessonQuiz } from '@/app/hooks/instructors'
import DialogAddQuestion from '@/components/shared/CourseContent/Dialog/DialogAddQuestion'
import LessonQuizzes from '@/components/shared/CourseContent/Lesson/LessonQuizzes'
import { showMessage } from '@/lib'

interface QuizItemProps {
    lesson: ILessonQuiz
    canEdit: boolean
    moduleId: number
}

const fieldsImport = ['question', 'question_type', 'correct_answer']

const QuizItem = ({ lesson, moduleId, canEdit }: QuizItemProps) => {
    const { title } = lesson
    const { data } = useGetLessonQuiz(moduleId)
    const { mutateAsync: deleteLessonQuiz, isPending } = useDeleteLessonQuiz()
    const { mutateAsync: createQuestion } = useCreateQuestion()

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isEditQuiz, setIsEditQuiz] = useState(false)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false)

    const handleImportClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleDownload = () => {
        Papa.parse('', {
            download: true,
            complete: function (results: any) {}
        })
    }

    const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files && files.length > 0) {
            const file = files[0]

            Papa.parse<File>(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results: any) => {
                    const data = results.data

                    for (const row of data) {
                        const missingFields = fieldsImport.filter((field) => !(field in row))
                        if (missingFields.length > 0) {
                            toast.error('File tải lên không hợp lệ!', {
                                description: 'Bạn cần tải lên file có dạng .csv và đúng định dạng'
                            })
                            return
                        }

                        const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']
                        const presentOptions = options.filter((option) => option in row).length

                        if (presentOptions < 2) {
                            toast.error('Cần ít nhất 2 options cho câu hỏi: ' + row.question)
                            return
                        }

                        if (presentOptions > 5) {
                            toast.error('Tối đa chỉ được 5 options cho câu hỏi: ' + row.question)
                            return
                        }

                        const optionsArray = options
                            .map((option) => {
                                if (option in row) {
                                    return {
                                        text: row[option],
                                        image: row.image || undefined,
                                        remove_image: row.remove_image || false
                                    }
                                }
                                return null
                            })
                            .filter((option) => option !== null)

                        let correctAnswer: number | number[]

                        if (row.question_type === 'one_choice') {
                            correctAnswer = Number(row.correct_answer)
                        } else {
                            correctAnswer = row.correct_answer.split(',').map((answer: any) => Number(answer.trim()))
                        }

                        const payload = {
                            question: {
                                question: row.question,
                                type: row.question_type,
                                correct_answer: correctAnswer,
                                image: row.image
                            },
                            options: optionsArray
                        }
                        await createQuestion([lesson.id!, payload])
                    }
                }
            })
        }
    }

    const handleDeleteLesson = async () => {
        if (canEdit) {
            await deleteLessonQuiz(lesson.id)
            setIsOpenDialog(false)
        } else showMessage()
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
                            {data && data?.quiz?.questions.length > 0 && (
                                <>
                                    {'-'}
                                    <h4>
                                        Số lượng câu hỏi: <strong>{data?.quiz?.questions.length}</strong>
                                    </h4>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input hidden type="file" ref={inputRef} accept=".csv" onChange={(e) => handleImportFile(e)} />
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={!canEdit}
                            onClick={handleDownload}
                            className="flex items-center gap-2"
                        >
                            Mẫu import <FaFileDownload className="size-3 text-primary" />
                        </Button>
                        <Button size="sm" variant="outline" disabled={!canEdit} onClick={handleImportClick}>
                            Import câu hỏi
                        </Button>
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
