import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SUPPORTED_LANGUAGES } from '@/constants/language'

const LessonCodingInfo = () => {
    return (
        <div className="mx-auto flex max-w-[767px] flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold">Lập kế hoạch cho bài tập</h3>
                <p>
                    <strong>Bài tập Coding </strong> cho phép học viên của bạn thực hành một phần công việc thực tế được
                    nhắm vào mục tiêu và nhận phản hồi ngay lập tức. Bạn nên làm theo các bước sau đây: Lập kế hoạch cho
                    bài tập, xác định giải pháp và chỉ dẫn học viên. Điều này sẽ đảm bảo bạn định hình được vấn đề và
                    cung cấp hướng dẫn cần thiết có lưu ý đến giải pháp.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                    <label className="text-sm text-muted-foreground">Tên bài tập</label>
                    <Input placeholder="Đặt tên cho bài tập này dành cho học viên." autoFocus />
                </div>

                <Select>
                    <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-muted-foreground">Chọn ngôn ngữ cho bài tập</label>
                        <SelectTrigger className="flex h-10 w-full items-center justify-between">
                            <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_LANGUAGES.map((language) => (
                                    <SelectItem value={language.value} key={language.value}>
                                        {language.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </div>
                </Select>

                <div className="flex flex-col gap-0.5">
                    <label className="text-sm text-muted-foreground">Mục tiêu học tập</label>
                    <Textarea placeholder="Cung cấp một mục tiêu cho bài  tập coding này." rows={3} />
                </div>
            </div>
        </div>
    )
}

export default LessonCodingInfo
