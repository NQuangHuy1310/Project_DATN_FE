import { Dispatch, SetStateAction, useState } from 'react'

import ReactQuill from 'react-quill'

import { Button } from '@/components/ui/button'
import useFormatTime from '@/app/hooks/common/useFomatTime'
import { ILessonLeaning } from '@/types/course/course'
import { useAddNoteLesson } from '@/app/hooks/courses/useNote'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'

const AddNote = ({
    lessonData,
    open,
    isOpen,
    currentVideoTime,
    setCheckNote
}: {
    lessonData: ILessonLeaning
    open: boolean
    isOpen: (open: boolean) => void
    currentVideoTime: number
    setCheckNote: Dispatch<SetStateAction<boolean>>
}) => {
    const [content, setContent] = useState<string>()
    const { mutateAsync: noteLessonAdd } = useAddNoteLesson()
    const submitNote = async () => {
        await noteLessonAdd([
            lessonData.id,
            {
                content: content!,
                duration: currentVideoTime
            }
        ])
        setCheckNote(true)
        isOpen(false)
    }
    return (
        <Sheet open={open} onOpenChange={() => isOpen(false)}>
            <SheetContent
                side="bottom"
                className="z-[999] w-full overflow-y-auto border bg-white py-3 transition-all duration-500 ease-in-out"
            >
                <div className="mx-auto max-h-screen max-w-6xl overflow-y-auto px-12">
                    <div className="flex items-center gap-2 py-2">
                        <SheetTitle className="text-xl font-semibold">Thêm ghi chú tại</SheetTitle>
                        <Button className="h-7">{useFormatTime(currentVideoTime)}</Button>
                    </div>
                    <div className="py-2">
                        <ReactQuill onChange={setContent} placeholder="Nhập ghi chú" />
                        <div className="mt-5 flex justify-end gap-2">
                            <SheetClose>
                                <Button className="uppercase" variant="secondary">
                                    Hủy bỏ
                                </Button>
                            </SheetClose>
                            <Button className="uppercase" disabled={!content} onClick={submitNote}>
                                Tạo ghi chú
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default AddNote
