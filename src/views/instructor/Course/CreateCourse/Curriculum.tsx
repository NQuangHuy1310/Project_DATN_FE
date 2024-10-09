import { memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CourseContent from '@/components/shared/CourseContent'

const Curriculum = memo(() => {
    return (
        <div className="rounded-lg p-5">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-5">
                <h4 className="text-2xl font-semibold capitalize">Chương trình giảng dạy</h4>
                <div className="flex gap-3">
                    <Button size="default">Lưu thông tin</Button>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-7">
                <CourseContent />

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="">
                            <Button className="flex items-center gap-1 text-muted-foreground" variant="outline">
                                <FiPlus className="size-4 text-muted-foreground" /> Thêm chương
                            </Button>
                        </div>
                    </DialogTrigger>
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
                                <Input placeholder="Mục tiêu học tập" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Lưu thông tin</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
})

export default Curriculum
