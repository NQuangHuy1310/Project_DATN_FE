import { MdEdit } from 'react-icons/md'
import { LuTrash } from 'react-icons/lu'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { FaRegImage } from 'react-icons/fa6'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateLessonQuiz, useDeleteQuestion, useGetLessonQuiz, useUpdateLessonQuiz } from '@/app/hooks/instructors'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonQuiz, lessonQuizSchema } from '@/validations'
import { IQuestion } from '@/types/instructor'
import DialogAddQuestion from '@/components/shared/CourseContent/Dialog/DialogAddQuestion'
import PreviewImage from '@/components/shared/PreviewImage'
import { getImagesUrl, showMessage } from '@/lib'
import ConfirmDialog from '@/components/shared/ConfirmDialog'

interface LessonQuizzesProps {
    moduleId: number
    canEdit?: boolean
    handleHiddenLesson?: Dispatch<SetStateAction<boolean>>
}

const LessonQuizzes = ({ handleHiddenLesson, moduleId, canEdit }: LessonQuizzesProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<lessonQuiz>({
        resolver: zodResolver(lessonQuizSchema)
    })

    const { data } = useGetLessonQuiz(moduleId)
    const { mutateAsync: createLessonQuiz } = useCreateLessonQuiz()
    const { mutateAsync: updateLessonQuiz } = useUpdateLessonQuiz()
    const { mutateAsync: deleteLessonQuiz, isPending } = useDeleteQuestion()

    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [openDialogPreview, setOpenDialogPreview] = useState<boolean>(false)
    const [confirmDeleteQuestion, setConfirmDeleteQuestion] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string>('')
    const [questionID, setQuestionID] = useState<number>(0)
    const [selectMultiple, setSelectMultiple] = useState<boolean>(false)
    const [selectedQuestions, setSelectedQuestions] = useState<number[] | undefined>([])

    const handleDeleteQuiz = async () => {
        if (canEdit) {
            await deleteLessonQuiz(questionID)
            setConfirmDeleteQuestion(!confirmDeleteQuestion)
        } else showMessage()
    }

    const handleImageClick = (url: string) => {
        setImagePreview(getImagesUrl(url))
        setOpenDialogPreview(true)
    }

    const handleDeleteQuestions = async () => {}

    const handleSubmitForm: SubmitHandler<lessonQuiz> = async (formData) => {
        if (canEdit) {
            const payload = {
                ...formData,
                _method: data?.quiz ? 'PUT' : undefined
            }
            if (data?.quiz) {
                await updateLessonQuiz([data.quiz.id, payload])
            } else {
                await createLessonQuiz([moduleId, formData])
            }
            handleHiddenLesson?.(false)
        } else showMessage()
    }

    useEffect(() => {
        if (data?.quiz) {
            setValue('title', data.quiz.title)
            setValue('description', data.quiz.description)
        }
    }, [data?.quiz, setValue])

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="space-y-2 rounded-lg bg-white p-4">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">
                                    Bạn cần nhập tiêu đề cho bài tập
                                </label>
                                <Input
                                    placeholder="Nhập tiêu đề bài tập"
                                    className="w-[600px]"
                                    type="text"
                                    {...register('title')}
                                    autoFocus
                                    disabled={isSubmitting}
                                />
                                {errors.title && (
                                    <div className="text-sm text-secondaryRed">{errors.title.message}</div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Bạn cần nhập mô tả cho bài tập</label>
                            <Textarea
                                placeholder="Nhập mô tả bài tập"
                                className="w-[600px]"
                                rows={3}
                                {...register('description')}
                                disabled={isSubmitting}
                            />
                            {errors.description && (
                                <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                            )}
                        </div>

                        <div className="space-x-3 text-end">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => handleHiddenLesson?.(false)}
                                disabled={isSubmitting}
                            >
                                Huỷ
                            </Button>
                            {selectMultiple && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={isSubmitting}
                                    onClick={handleDeleteQuestions}
                                >
                                    Xoá đáp án đã chọn
                                </Button>
                            )}
                            {data?.quiz?.questions && (
                                <Button
                                    type="button"
                                    className="bg-secondaryGreen hover:bg-secondaryGreen/90"
                                    disabled={isSubmitting}
                                    onClick={() => setSelectMultiple(!selectMultiple)}
                                >
                                    {selectMultiple ? 'Bỏ' : 'Chọn'} nhiều đáp án
                                </Button>
                            )}

                            <Button type="submit" disabled={isSubmitting}>
                                {data?.quiz ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {data?.quiz?.questions.map((question, index) => (
                            <div
                                className="flex flex-col gap-4 rounded-md border-[1px] border-grey p-3"
                                key={question.id}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-center gap-2">
                                        {selectMultiple ? (
                                            <Input
                                                checked={selectedQuestions?.includes(question.id)}
                                                type="checkbox"
                                                className="size-4"
                                                onChange={() => {
                                                    setSelectedQuestions((prev) => {
                                                        const currentSelected = prev ?? []
                                                        if (currentSelected.includes(question.id)) {
                                                            return currentSelected.filter((id) => id !== question.id)
                                                        } else {
                                                            return [...currentSelected, question.id]
                                                        }
                                                    })
                                                }}
                                            />
                                        ) : null}
                                        <div className="flex items-center gap-4">
                                            <h6 className="rounded-sm border-[1px] border-black/50 px-4 py-0.5 text-xs font-medium">
                                                {index + 1}.{' '}
                                                {question.type === 'one_choice'
                                                    ? 'Một đáp án đúng'
                                                    : 'Nhiều đáp án đúng'}
                                            </h6>
                                            {question.image_url && (
                                                <div onClick={() => handleImageClick(question.image_url!)}>
                                                    <FaRegImage className="size-4 text-secondaryYellow" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-x-2">
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="outline"
                                            className="h-[30px] w-[30px]"
                                            onClick={() => {
                                                setSelectedQuestion(question)
                                                setOpenDialog(true)
                                            }}
                                            disabled={!canEdit}
                                        >
                                            <MdEdit />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="outline"
                                            className="h-[30px] w-[30px]"
                                            onClick={() => {
                                                setQuestionID(question.id)
                                                setConfirmDeleteQuestion(true)
                                            }}
                                        >
                                            <LuTrash />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-sm">
                                        Câu hỏi: <strong>{question.question}</strong>
                                    </h4>
                                    {question.options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            {option.is_correct === 1 ? (
                                                <FaCheck className="size-4 text-primary" />
                                            ) : (
                                                <IoMdClose className="size-4 text-secondaryRed" />
                                            )}
                                            <span className="min-w-[50px] flex-shrink-0">{option.option}</span>
                                            {option.image_url && (
                                                <div onClick={() => handleImageClick(option.image_url)}>
                                                    <FaRegImage className="size-4 text-secondaryYellow" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>

            {/* Dialog */}
            <DialogAddQuestion openDialog={openDialog} setOpenDialog={setOpenDialog} question={selectedQuestion!} />
            <PreviewImage imageSrc={imagePreview} open={openDialogPreview} onOpenChange={setOpenDialogPreview} />
            <ConfirmDialog
                title="Xác nhận xóa câu hỏi"
                isPending={isPending}
                description="Bạn có chắc chắn muốn xóa câu hỏi này? Hành động này sẽ không thể hoàn tác và câu hỏi sẽ bị xóa khỏi bài tập trong chương học."
                confirmDialog={confirmDeleteQuestion}
                setConfirmDialog={setConfirmDeleteQuestion}
                handleDelete={handleDeleteQuiz}
            />
        </>
    )
}

export default LessonQuizzes
