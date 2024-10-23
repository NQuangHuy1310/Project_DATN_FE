import { MdEdit } from 'react-icons/md'
import { LuTrash } from 'react-icons/lu'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
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

interface LessonQuizzesProps {
    moduleId: number
    handleHiddenLesson?: Dispatch<SetStateAction<boolean>>
}

const LessonQuizzes = ({ handleHiddenLesson, moduleId }: LessonQuizzesProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<lessonQuiz>({
        resolver: zodResolver(lessonQuizSchema)
    })
    const { mutateAsync: createLessonQuiz } = useCreateLessonQuiz()
    const { mutateAsync: updateLessonQuiz } = useUpdateLessonQuiz()
    const { mutateAsync: deleteLessonQuiz } = useDeleteQuestion()
    const { data } = useGetLessonQuiz(moduleId)
    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>()
    const [openDialog, setOpenDialog] = useState(false)

    const handleSubmitForm: SubmitHandler<lessonQuiz> = async (formData) => {
        if (formData && data?.quiz) {
            const payload = {
                ...formData,
                _method: 'PUT'
            }
            await updateLessonQuiz([data?.quiz.id, payload])
            handleHiddenLesson?.(false)
        } else {
            await createLessonQuiz([moduleId, formData])
            handleHiddenLesson?.(false)
        }
    }

    const handleDeleteQuiz = async (questionId: number) => {
        await deleteLessonQuiz(questionId)
    }

    useEffect(() => {
        if (data?.quiz) {
            setValue('title', data?.quiz?.title ?? '')
            setValue('description', data?.quiz?.description ?? '')
        }
    }, [data?.quiz, setValue])

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="space-y-2 rounded-lg bg-white p-4">
                    <div className="space-y-2 border-b-[1px] border-grey pb-4">
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
                                />
                                {errors.title && (
                                    <div className="text-sm text-secondaryRed">{errors.title.message}</div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-muted-foreground">Tổng điển của bài tập</label>
                                <Input
                                    placeholder="Tổng số điểm bài tập"
                                    className="w-[300px]"
                                    type="number"
                                    disabled
                                    value={data?.quiz?.total_points ?? 0}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Bạn cần nhập mô tả cho bài tập</label>
                            <Textarea
                                placeholder="Nhập mô tả bài tập"
                                className="w-[600px]"
                                rows={3}
                                {...register('description')}
                            ></Textarea>
                            {errors.description && (
                                <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {data?.quiz &&
                            data?.quiz?.questions.map((question, index) => {
                                return (
                                    <div
                                        className="flex flex-col gap-4 rounded-md border-[1px] border-grey p-3"
                                        key={index}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <h6 className="w-fit rounded-sm border-[1px] border-black/50 px-4 py-0.5 text-xs font-medium">
                                                    {index + 1}. Multiple Choice
                                                </h6>
                                                <h6 className="w-fit rounded-sm border-[1px] border-black/50 px-4 py-0.5 text-xs font-medium">
                                                    {question.points}. Point
                                                </h6>
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
                                                >
                                                    <MdEdit />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-[30px] w-[30px]"
                                                    onClick={() => handleDeleteQuiz(question.id)}
                                                >
                                                    <LuTrash />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm">
                                                Câu hỏi: <strong>{question.question}</strong>
                                            </h4>
                                            {question.options.map((option, index) => {
                                                return (
                                                    <div key={index} className="flex items-center gap-2">
                                                        {option.is_correct === 1 ? (
                                                            <FaCheck className="size-4 text-primary" />
                                                        ) : (
                                                            <IoMdClose className="size-4 text-secondaryRed" />
                                                        )}
                                                        <span>{option.option}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>

                    <div className="space-x-4 text-end">
                        <Button
                            variant="destructive"
                            onClick={() => handleHiddenLesson?.(false)}
                            disabled={isSubmitting}
                        >
                            Huỷ
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {data?.quiz ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </div>
                </div>
            </form>

            {/* Dialog */}
            <DialogAddQuestion openDialog={openDialog} setOpenDialog={setOpenDialog} question={selectedQuestion!} />
        </>
    )
}

export default LessonQuizzes
