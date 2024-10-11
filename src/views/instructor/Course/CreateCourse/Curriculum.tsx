import { memo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import CourseContent from '@/components/shared/CourseContent'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Curriculum = memo(() => {
    const [openDialog, setOpenDialog] = useState(false)

    return (
        <div className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Chương trình giảng dạy</h4>
                {/* <div className="flex gap-3">
                    <Button size="default">Lưu thông tin</Button>
                </div> */}
            </div>

            <div className="mt-4 flex flex-col gap-7">
                <CourseContent />

                <div className="">
                    <Button
                        className="flex items-center gap-1 text-muted-foreground"
                        variant="outline"
                        onClick={() => setOpenDialog(true)}
                    >
                        <FiPlus className="size-4 text-muted-foreground" /> Thêm chương
                    </Button>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Tạo chương mới</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Nhập tiêu đề cho phần mới</label>
                            <Input placeholder="Nội dung tiêu đề" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">
                                Học viên có thể làm gì sau khi phần này kết thúc
                            </label>
                            <Textarea placeholder="Mục tiêu học tập" rows={3} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Lưu thông tin</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
})

export default Curriculum
