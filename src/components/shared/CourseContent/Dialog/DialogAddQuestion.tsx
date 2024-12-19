/* eslint-disable indent */
import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { FaRegTrashAlt, FaImage } from 'react-icons/fa'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'

import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateQuestion, useUpdateQuestion } from '@/app/hooks/instructors'
import { IQuestion } from '@/types/instructor'
import { getImagesUrl, validateFileSize } from '@/lib'
import PreviewImage from '@/components/shared/PreviewImage'

interface DialogAddQuestionProps {
    openDialog: boolean
    quizId?: number
    setOpenDialog: Dispatch<SetStateAction<boolean>>
    question?: IQuestion
}

interface Answer {
    id?: number
    text: string
    image?: File | string
    remove_image?: boolean
}

const DialogAddQuestion = ({ openDialog, setOpenDialog, quizId, question }: DialogAddQuestionProps) => {
    const [questionText, setQuestionText] = useState<string>('')
    const [questionImage, setQuestionImage] = useState<File | string | undefined>(undefined)
    const [questionType, setQuestionType] = useState<'one_choice' | 'multiple_choice'>('one_choice')
    const [answers, setAnswers] = useState<Answer[]>([
        { text: '', image: undefined, remove_image: false },
        { text: '', image: undefined, remove_image: false },
        { text: '', image: undefined, remove_image: false },
        { text: '', image: undefined, remove_image: false }
    ])
    const [correctAnswers, setCorrectAnswers] = useState<number[]>([])
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])
    const fileQuestionInputRef = useRef<HTMLInputElement | null>(null)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [openPreview, setOpenPreview] = useState<boolean>(false)

    const { mutateAsync: createQuestion, isPending: isPendingCreate } = useCreateQuestion()
    const { mutateAsync: updateQuestion, isPending: isPendingUpdate } = useUpdateQuestion()

    const handleOptionChange = (index: number, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index].text = value
        setAnswers(newAnswers)
    }

    const handleCorrectChange = useCallback(
        (index: number) => {
            if (questionType === 'one_choice') {
                setCorrectAnswers([index])
            } else {
                setCorrectAnswers((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
            }
        },
        [questionType]
    )

    const handleAddAnswer = () => {
        if (answers.length < 5) {
            setAnswers([...answers, { text: '', image: undefined }])
        } else {
            toast.error(MessageErrors.limitAnswers)
        }
    }

    const handleRemoveAnswer = (index: number) => {
        if (answers.length > 2) {
            const newAnswers = answers.filter((_, i) => i !== index)
            setAnswers(newAnswers)
            setCorrectAnswers(correctAnswers.filter((i) => i !== index))
        } else {
            toast.error(MessageErrors.minAnswers)
        }
    }

    const handleImageChange = (index: number, file: File | null) => {
        const newAnswers = [...answers]
        if (file && validateFileSize(file, 'image')) {
            newAnswers[index].image = file
        } else {
            newAnswers[index].image = undefined
        }
        setAnswers(newAnswers)
    }

    const handleQuestionImageChange = (file: File) => {
        if (file && validateFileSize(file, 'image')) {
            setQuestionImage(file)
        }
    }

    const handleImageRemove = (index: number) => {
        const newAnswers = [...answers]
        newAnswers[index].image = undefined
        newAnswers[index].remove_image = true
        setAnswers(newAnswers)
    }

    const handleImageRemoveQuestion = () => {
        setQuestionImage(undefined)
    }

    const handleSetPreviewImage = (imageSrc: string) => {
        setPreviewImage(imageSrc)
        setOpenPreview(true)
    }

    const isValidQuestion = (questionText: string, answers: Answer[]): boolean => {
        return !!questionText && answers.some((answer) => answer.text?.trim() !== '')
    }

    const handleSubmit = async () => {
        const correct_answer = questionType === 'one_choice' ? correctAnswers[0] : correctAnswers
        const options = question
            ? answers.map((answer) => {
                  return {
                      text: answer.text,
                      image: answer.image,
                      id: answer.id,
                      ...(answer.image ? {} : { remove_image: answer.remove_image })
                  }
              })
            : answers.map((answer) => ({
                  text: answer.text,
                  image: typeof answer.image === 'string' ? undefined : answer.image,
                  ...(typeof answer.image === 'undefined' ? { remove_image: answer.remove_image } : {})
              }))

        const data = {
            question: {
                question: questionText,
                type: questionType,
                correct_answer: correct_answer,
                image: questionImage
            },
            options: options
        }

        if (question) {
            const payload = { ...data, _method: 'PUT' }
            await updateQuestion([question.id, payload])
        } else {
            await createQuestion([quizId!, data])
        }

        resetForm()
    }

    const resetForm = () => {
        setOpenDialog(false)
        setQuestionText('')
        setQuestionImage(undefined)
        setAnswers([
            { text: '', image: undefined },
            { text: '', image: undefined },
            { text: '', image: undefined },
            { text: '', image: undefined }
        ])
        setCorrectAnswers([])
    }

    useEffect(() => {
        if (question) {
            const correctAnswers = question.options.reduce<number[]>((acc, option, index) => {
                if (option.is_correct === 1) {
                    acc.push(index)
                }
                return acc
            }, [])

            setQuestionText(question.question)
            setQuestionType(question.type)
            setAnswers(
                question.options.map((option) => ({
                    text: option.option,
                    image: option?.image_url ? getImagesUrl(option.image_url) : undefined,
                    id: option?.id
                }))
            )
            setCorrectAnswers(correctAnswers)
            setQuestionImage(question.image_url ? getImagesUrl(question.image_url) : undefined)
        }
    }, [question])

    // Revoke object URL
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(questionImage as string)
            answers.forEach((answer) => {
                if (answer.image) {
                    URL.revokeObjectURL(answer.image as string)
                }
            })
        }
    }, [questionImage, answers])

    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-screen-lg" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{question ? 'Sửa câu hỏi' : 'Thêm câu hỏi'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex h-[150px] flex-col gap-1">
                            <Textarea
                                placeholder="Nhập câu hỏi"
                                rows={4}
                                className="h-full w-full resize-none text-base"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    type="button"
                                    onClick={() => fileQuestionInputRef.current?.click()}
                                >
                                    <FaImage className="size-3 cursor-pointer" />
                                </Button>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    ref={fileQuestionInputRef}
                                    onChange={(e) => {
                                        const file = e.target.files ? (e.target.files[0] as File) : null
                                        handleQuestionImageChange(file!)
                                    }}
                                    className="hidden"
                                />
                                {questionImage && (
                                    <div className="relative mt-2 h-[60px] w-[100px] cursor-pointer">
                                        <img
                                            src={
                                                typeof questionImage === 'string'
                                                    ? questionImage
                                                    : URL.createObjectURL(questionImage)
                                            }
                                            alt="Preview"
                                            className="h-full w-full rounded-lg object-cover"
                                            onClick={() =>
                                                handleSetPreviewImage(
                                                    typeof questionImage === 'string'
                                                        ? questionImage
                                                        : URL.createObjectURL(questionImage)
                                                )
                                            }
                                        />
                                        <div
                                            className="absolute right-1 top-1 cursor-pointer"
                                            onClick={handleImageRemoveQuestion}
                                        >
                                            <IoMdClose className="size-4 text-black" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{ gridTemplateColumns: `repeat(${Math.min(answers.length, 5)}, 1fr)` }}
                            className="grid gap-2"
                        >
                            {answers.map((answer, index) => (
                                <div
                                    key={index}
                                    className="flex min-h-[220px] flex-col gap-1 rounded-md border-[1px] border-grey p-2.5"
                                >
                                    <div className="flex flex-shrink-0 items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                type="button"
                                                className="h-[24px] w-[24px]"
                                                onClick={() => handleRemoveAnswer(index)}
                                            >
                                                <FaRegTrashAlt className="size-3 cursor-pointer" />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                type="button"
                                                className="h-[24px] w-[24px]"
                                                onClick={() => fileInputRefs.current[index]?.click()}
                                            >
                                                <FaImage className="size-3 cursor-pointer" />
                                            </Button>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                ref={(el) => (fileInputRefs.current[index] = el)}
                                                onChange={(e) =>
                                                    handleImageChange(index, e.target.files ? e.target.files[0] : null)
                                                }
                                                className="hidden"
                                            />
                                        </div>
                                        <Input
                                            type={questionType === 'one_choice' ? 'radio' : 'checkbox'}
                                            className="size-5 cursor-pointer"
                                            checked={correctAnswers.includes(index)}
                                            onChange={() => handleCorrectChange(index)}
                                            name="correct_answer"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <Textarea
                                            placeholder="Nhập đáp án"
                                            rows={4}
                                            className="min-h-[120px] resize-none rounded-none border-none p-0 shadow-none focus-visible:ring-transparent"
                                            value={answer.text}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        />
                                        {answer.image && (
                                            <div className="relative mt-2 h-[60px] w-[100px]">
                                                <img
                                                    src={
                                                        typeof answer.image === 'string'
                                                            ? answer.image
                                                            : URL.createObjectURL(answer.image)
                                                    }
                                                    alt="Preview"
                                                    className="h-full w-full cursor-pointer rounded-lg object-cover"
                                                    onClick={() =>
                                                        handleSetPreviewImage(
                                                            typeof answer.image === 'string'
                                                                ? answer.image
                                                                : URL.createObjectURL(answer.image!)
                                                        )
                                                    }
                                                />
                                                <div
                                                    className="absolute right-1 top-1 cursor-pointer"
                                                    onClick={() => handleImageRemove(index)}
                                                >
                                                    <IoMdClose className="size-4 text-black" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-start gap-4">
                            {answers.length < 5 && (
                                <Button variant="secondary" type="button" onClick={handleAddAnswer}>
                                    <FaPlus /> Thêm đáp án
                                </Button>
                            )}

                            <Select
                                value={questionType}
                                onValueChange={(value) => setQuestionType(value as 'one_choice' | 'multiple_choice')}
                            >
                                <SelectTrigger className="flex h-[36px] w-[136px] items-center justify-between">
                                    <SelectValue placeholder="Chọn loại câu hỏi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="one_choice">Một đáp án</SelectItem>
                                        <SelectItem value="multiple_choice">Nhiều đáp án</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                            Huỷ
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                isPendingCreate ||
                                isPendingUpdate ||
                                !questionText ||
                                !isValidQuestion(questionText, answers)
                            }
                        >
                            {question ? 'Cập nhật' : 'Thêm'} câu hỏi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <PreviewImage open={openPreview} onOpenChange={setOpenPreview} imageSrc={previewImage} />
        </>
    )
}

export default DialogAddQuestion
