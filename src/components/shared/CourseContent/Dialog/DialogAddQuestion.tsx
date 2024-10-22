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

interface DialogAddQuestionProps {
    openDialog: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

interface Answer {
    option: string
    image_url: string
    is_correct: boolean
}

const DialogAddQuestion = ({ openDialog, setOpenDialog }: DialogAddQuestionProps) => {
    const [answers, setAnswers] = useState<Answer[]>([
        { option: '', image_url: '', is_correct: false },
        { option: '', image_url: '', is_correct: false },
        { option: '', image_url: '', is_correct: false },
        { option: '', image_url: '', is_correct: false }
    ])

    const handleOptionChange = (index: number, value: string) => {
        const newAnswers = [...answers]
        newAnswers[index].option = value
        setAnswers(newAnswers)
    }

    const handleCorrectChange = (index: number) => {
        const newAnswers = answers.map((answer, i) => ({
            ...answer,
            is_correct: i === index
        }))
        setAnswers(newAnswers)
    }

    const handleAddAnswer = () => {
        if (answers.length < 5) return setAnswers([...answers, { option: '', image_url: '', is_correct: false }])
        toast.error(MessageErrors.limitAnswers)
    }

    const handleRemoveAnswer = (index: number) => {
        if (answers.length > 2) {
            const newAnswers = answers.filter((_, i) => i !== index)
            setAnswers(newAnswers)
        } else {
            toast.error(MessageErrors.minAnswers)
        }
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-screen-lg" aria-describedby={undefined}>
                <form>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex h-[150px] flex-col gap-1">
                            <Textarea
                                placeholder="Nhập câu hỏi"
                                rows={4}
                                className="h-full w-full resize-none text-base"
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
                                            type="radio"
                                            className="size-4"
                                            name="correctAnswer"
                                            checked={answer.is_correct}
                                            onChange={() => handleCorrectChange(index)}
                                        />
                                    </div>
                                    <div className="flex-1 p-2">
                                        <Textarea
                                            placeholder="Nhập đáp án"
                                            rows={4}
                                            className="resize-none rounded-none border-none p-0 shadow-none focus-visible:ring-transparent"
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                        ></Textarea>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <Button variant="secondary" type="button" onClick={handleAddAnswer}>
                                <FaPlus /> Thêm đáp án
                            </Button>

                            <Select defaultValue="1">
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
                        <Button type="submit">Thêm câu hỏi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DialogAddQuestion
