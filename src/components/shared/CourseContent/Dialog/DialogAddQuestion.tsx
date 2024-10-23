import { toast } from 'sonner'
import { FaPlus } from 'react-icons/fa6'
import { FaRegTrashAlt, FaImage } from 'react-icons/fa'
import { Dispatch, SetStateAction, useState } from 'react'

import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateQuestion } from '@/app/hooks/instructors'

interface DialogAddQuestionProps {
    openDialog: boolean
    quizId: number
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

interface Answer {
    text: string
    image?: File | undefined
}

const DialogAddQuestion = ({ openDialog, setOpenDialog, quizId }: DialogAddQuestionProps) => {
    const [questionText, setQuestionText] = useState<string>('')
    const [questionType, setQuestionType] = useState<'one_choice' | 'multiple_choice'>('one_choice')
    const [points, setPoints] = useState<number>(1)
    const [answers, setAnswers] = useState<Answer[]>([
        { text: '', image: undefined },
        { text: '', image: undefined },
        { text: '', image: undefined },
        { text: '', image: undefined }
    ])
    const [correctAnswers, setCorrectAnswers] = useState<number[]>([])

    const { mutateAsync: createQuestion } = useCreateQuestion()

    const handleOptionChange = (index: number, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index].text = value
        setAnswers(newAnswers)
    }

    const handleCorrectChange = (index: number) => {
        const newCorrectAnswers = correctAnswers.includes(index)
            ? correctAnswers.filter((i) => i !== index)
            : [...correctAnswers, index]
        setCorrectAnswers(newCorrectAnswers)
    }

    const handleAddAnswer = () => {
        if (answers.length < 5) {
            setAnswers([...answers, { text: '' }])
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

    const handleSubmit = async () => {
        const data = {
            question: {
                question: questionText,
                type: questionType,
                points,
                correct_answer: correctAnswers
            },
            options: answers.map((answer) => ({
                text: answer.text,
                image: answer.image !== undefined ? answer.image : undefined
            }))
        }

        await createQuestion([quizId, data])

        setOpenDialog(false)
        setQuestionText('')
        setAnswers([
            { text: '', image: undefined },
            { text: '', image: undefined },
            { text: '', image: undefined },
            { text: '', image: undefined }
        ])
        setPoints(1)
        setCorrectAnswers([])
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-screen-lg" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Thêm câu hỏi</DialogTitle>
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
                                        >
                                            <FaImage className="size-3 cursor-pointer" />
                                        </Button>
                                    </div>
                                    <Input
                                        type={questionType === 'one_choice' ? 'radio' : 'checkbox'}
                                        className="size-4"
                                        checked={correctAnswers.includes(index)}
                                        onChange={() => handleCorrectChange(index)}
                                    />
                                </div>
                                <div className="flex-1 p-2">
                                    <Textarea
                                        placeholder="Nhập đáp án"
                                        rows={4}
                                        className="resize-none rounded-none border-none p-0 shadow-none focus-visible:ring-transparent"
                                        value={answer.text}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-start gap-4">
                        <Button variant="secondary" type="button" onClick={handleAddAnswer}>
                            <FaPlus /> Thêm đáp án
                        </Button>

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

                        <Select value={points.toString()} onValueChange={(e) => setPoints(Number(e))}>
                            <SelectTrigger className="flex h-[36px] w-[136px] items-center justify-between">
                                <SelectValue placeholder="Chọn điểm" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {[...Array(20).keys()].map((item) => (
                                        <SelectItem key={item + 1} value={(item + 1).toString()}>
                                            {item + 1} {item + 1 === 1 ? 'point' : 'points'}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                        Huỷ
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        Thêm câu hỏi
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogAddQuestion
