import { useGetCourses } from '@/app/hooks/instructors'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'

const CommunicateQa = () => {
    const { data: courseData } = useGetCourses()

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <Select>
                    <SelectTrigger className="flex w-[300px] items-center justify-between">
                        <SelectValue placeholder="Vui lòng chọn khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Danh sách khóa học</SelectLabel>
                            {courseData?.data.map((course, index) => (
                                <SelectItem value={course.name} key={index}>
                                    {course.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <h5 className="font-medium text-darkGrey">
                    Hãy chọn khóa học mà bạn muốn tham gia để trả lời câu hỏi!
                </h5>
            </div>

            {/* Nội dung sẽ được hiển thị sau khi chọn khóa học */}
            <div></div>
        </div>
    )
}

export default CommunicateQa
