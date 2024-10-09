import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const LessonQuizzes = () => {
    return (
        <div className="space-y-2 rounded-lg bg-white p-4">
            <div className="space-y-1 border-b-[1px] border-grey pb-4">
                <label className="text-xs text-muted-foreground">Bạn cần nhập tiêu đề cho bài giảng của mình</label>
                <Input placeholder="Nhập tiêu đề bài giảng" className="w-[600px]" />
            </div>
            <div className="space-y-1"></div>
            <div className="space-x-4 text-end">
                <Button variant="destructive">Huỷ</Button>
                <Button>Thêm bài giảng</Button>
            </div>
        </div>
    )
}

export default LessonQuizzes
