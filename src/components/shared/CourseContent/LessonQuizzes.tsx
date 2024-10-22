import { FaPlus } from 'react-icons/fa6'
import { Dispatch, SetStateAction, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import DialogAddQuestion from '@/components/shared/CourseContent/Dialog/DialogAddQuestion'

interface LessonQuizzesProps {
    moduleId: number
    handleHiddenLesson: Dispatch<SetStateAction<boolean>>
}

const LessonQuizzes = ({ handleHiddenLesson }: LessonQuizzesProps) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false)

    return (
        <div className="space-y-2 rounded-lg bg-white p-4">
            <div className="space-y-2 border-b-[1px] border-grey pb-4">
                <div className="flex gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Bạn cần nhập tiêu đề cho bài tập</label>
                        <Input placeholder="Nhập tiêu đề bài tập" className="w-[600px]" type="text" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Tổng điển của bài tập</label>
                        <Input placeholder="Tổng số điểm bài tập" className="w-[300px]" type="number" disabled />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Bạn cần nhập mô tả cho bài tập</label>
                    <Textarea placeholder="Nhập mô tả bài tập" className="w-[600px]" rows={3}></Textarea>
                </div>
            </div>

            <div className=""></div>

            <div className="space-y-1">
                <Button className="flex gap-1" onClick={() => setIsOpenDialog(true)}>
                    <FaPlus /> Thêm câu hỏi
                </Button>
            </div>

            <div className="space-x-4 text-end">
                <Button variant="destructive" onClick={() => handleHiddenLesson(false)}>
                    Huỷ
                </Button>
                <Button>Thêm bài tập</Button>
            </div>

            <DialogAddQuestion openDialog={isOpenDialog} setOpenDialog={setIsOpenDialog} />
        </div>
    )
}

export default LessonQuizzes
