import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { ICheckQuizLeaningPost, IQuizLeaning } from '@/types/course/course'
import { useCheckQuizLeaning, useGetQuizLeaning, useUpdateQuizProCess } from '@/app/hooks/courses/useLesson'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { getImagesUrl } from '@/lib'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const LeaningCourseQuiz = ({
    checkQuiz,
    dataLesson,
    idCourse,
    isLastQuiz,
    setCheckButton
}: {
    dataLesson: IQuizLeaning
    checkQuiz: boolean | undefined
    idCourse: number
    isLastQuiz: number
    setCheckButton: Dispatch<SetStateAction<boolean>>
}) => {
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: number | number[] | null }>({})
    const [incorrectOptions, setIncorrectOptions] = useState<{ [key: number]: number[] }>({})
    const [checkFinish, setCheckFinish] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [showImage, setShowImage] = useState<boolean>(false)

    const { user } = useGetUserProfile()

    // Kiểm tra quiz
    const { mutateAsync: checkQuizLeaning } = useCheckQuizLeaning()

    // Lưu tiến độ
    const { mutateAsync: quizProcess } = useUpdateQuizProCess()

    // Lấy đáp án người dùng đã làm rồi
    const { data: getQuizLeaning } = useGetQuizLeaning(user?.id!, dataLesson.id, checkQuiz)
    useEffect(() => {
        if (checkQuiz && getQuizLeaning?.answers) {
            const answersFromAPI = getQuizLeaning.answers.reduce((acc: any, answer) => {
                acc[answer.question_id] =
                    answer?.selected_option_id?.length === 1 ? answer?.selected_option_id[0] : answer.selected_option_id
                return acc
            }, {})
            setUserAnswers(answersFromAPI)
            setIsDisabled(false)
        }
    }, [checkQuiz, getQuizLeaning])

    const handleOptionChange = (questionId: number, optionId: number, type: string) => {
        setUserAnswers((prev) => {
            setIncorrectOptions((prevIncorrect) => ({
                ...prevIncorrect,
                [questionId]:
                    type === 'one_choice' ? [] : prevIncorrect[questionId]?.filter((id) => id !== optionId) || []
            }))

            if (type === 'one_choice') {
                return { ...prev, [questionId]: optionId }
            } else if (type === 'multiple_choice') {
                const selectedOptions = (prev[questionId] as number[]) || []
                const newSelectedOptions = selectedOptions.includes(optionId)
                    ? selectedOptions.filter((id) => id !== optionId)
                    : [...selectedOptions, optionId]
                return { ...prev, [questionId]: newSelectedOptions }
            }
            return prev
        })
    }

    const checkAnswers = async () => {
        setIsDisabled(true)
        const formattedAnswers = Object.keys(userAnswers).map((questionId) => {
            const answer = userAnswers[Number(questionId)]
            return {
                question_id: Number(questionId),
                selected_options: Array.isArray(answer)
                    ? answer.filter((item): item is number => typeof item === 'number')
                    : answer !== null && answer !== undefined
                      ? [answer as number]
                      : []
            }
        })

        const result: ICheckQuizLeaningPost = {
            course_id: idCourse,
            user_id: user?.id ?? 0,
            quiz_id: dataLesson.id,
            answers: formattedAnswers
        }

        const data = await checkQuizLeaning([result])

        setIsDisabled(false)

        if (data.total_score === 100) {
            setIsDisabled(true)
            await quizProcess([
                data.quiz_id,
                {
                    is_completed: 1,
                    _method: 'PUT'
                }
            ])
            if (isLastQuiz && isLastQuiz == 1) {
                setCheckFinish(true)
            }
            setCheckButton(false)
            toast.success('Chúc mừng bạn đã trả lời chính xác')
        } else {
            const incorrectOptionsByQuestion = data.result_details.reduce(
                (acc: { [key: number]: number[] }, result_details: any) => {
                    if (!result_details.is_correct) {
                        acc[result_details.question_id] = result_details.selected_options
                            .map(Number)
                            .filter((option: number) => !result_details.correct_options.includes(option))
                    }
                    return acc
                },
                {}
            )
            setIncorrectOptions(incorrectOptionsByQuestion)
            toast.error('Đáp án của bạn không chính xác')
        }
    }

    useEffect(() => {
        const allQuestionsAnswered = dataLesson.questions.every((question) => {
            const answer = userAnswers[question.id]
            return question.type === 'one_choice'
                ? answer !== null && answer !== undefined
                : Array.isArray(answer) && answer.length > 0
        })
        setIsDisabled(!allQuestionsAnswered)
    }, [userAnswers, dataLesson.questions])

    return (
        <div className="mx-auto max-w-5xl p-4">
            <h3 className="mb-4 text-2xl font-bold">{dataLesson?.title}</h3>
            {dataLesson.questions.map((question) => (
                <div key={question.id} className="mb-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <h4 className="text-lg font-medium">{question.question} ?</h4>
                            <span className="text-red-400">
                                ({question.type === 'one_choice' ? 'Chọn 1 đáp án' : 'Có thể chọn nhiều đáp án'})
                            </span>
                        </div>
                        <Dialog open={showImage} onOpenChange={() => setShowImage(false)}>
                            <DialogContent className="!w-[60vw]">
                                <img src={getImagesUrl(question.image_url!)} className="w-full" alt="" />
                            </DialogContent>
                        </Dialog>
                        <img
                            onClick={() => setShowImage(true)}
                            src={getImagesUrl(question.image_url!)}
                            className="w-full max-w-[260px]"
                            alt=""
                        />
                    </div>
                    <div
                        style={{ gridTemplateColumns: `repeat(${Math.min(question?.options?.length, 5)}, 1fr)` }}
                        className="grid gap-2"
                    >
                        {question.options.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleOptionChange(question.id, option.id, question.type)}
                                className={`relative mb-2 flex min-h-[220px] cursor-pointer flex-col gap-2 rounded-xl border-2 px-3 py-4 text-sm ${
                                    question.type === 'one_choice'
                                        ? userAnswers[question.id] === option.id
                                            ? 'border-primary/50'
                                            : 'border-white'
                                        : Array.isArray(userAnswers[question.id]) &&
                                            (userAnswers[question.id] as number[]).includes(option.id)
                                          ? 'border-primary/50'
                                          : 'border-white'
                                } ${
                                    incorrectOptions[question.id]?.includes(option.id)
                                        ? 'border-red-500'
                                        : 'bg-softGrey'
                                } transition-all duration-200 hover:bg-blue-50`}
                            >
                                <span
                                    className={`${!option.image_url && 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'} text-base`}
                                >
                                    {option.option}
                                </span>
                                {option.image_url && (
                                    <img
                                        src={getImagesUrl(option.image_url)}
                                        className="h-[80%] w-full rounded-md"
                                        alt=""
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <AlertDialog open={checkFinish} onOpenChange={() => setCheckFinish(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Chúc mừng bạn đã hoàn thành khóa học</AlertDialogTitle>
                        <AlertDialogDescription>Cảm ơn bạn đã tham gia học cùng chúng tôi</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Đóng</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Button onClick={checkAnswers} disabled={isDisabled || getQuizLeaning ? true : false}>
                Kiểm tra
            </Button>
        </div>
    )
}

export default LeaningCourseQuiz
