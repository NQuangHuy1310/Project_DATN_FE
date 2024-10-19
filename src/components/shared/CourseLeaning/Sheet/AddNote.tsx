import useFormatTime from '@/app/hooks/common/useFomatTime'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddNote = ({
    open,
    isOpen,
    currentVideoTime
}: {
    open: boolean
    isOpen: (open: boolean) => void
    currentVideoTime: number
}) => {
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
                        <Textarea
                            name=""
                            id=""
                            className="min-h-25 block w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                                const target = e.target as HTMLTextAreaElement
                                target.style.height = 'auto'
                                target.style.height = `${target.scrollHeight}px`
                            }}
                        />
                        <div className="mt-5 flex justify-end gap-2">
                            <SheetClose>
                                <Button className="uppercase" variant="secondary">
                                    Hủy bỏ
                                </Button>
                            </SheetClose>
                            <Button className="uppercase">Tạo ghi chú</Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default AddNote
