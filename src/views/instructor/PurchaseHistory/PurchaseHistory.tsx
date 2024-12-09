import { useState } from 'react'

import { ICourseApproved } from '@/types/instructor'
import { useGetCoursesApproved } from '@/app/hooks/instructors'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'

const PurchaseHistory = () => {
    const { data: courseData } = useGetCoursesApproved()

    const [courseId, setCourseId] = useState<number | undefined>(undefined)

    const handleSelectCourse = (value: string) => {
        if (value === 'all') {
            setCourseId(undefined)
        } else {
            setCourseId(+value)
        }
    }

    return (
        <div>
            <div className="flex h-[72px] items-end gap-6">
                <div className="flex h-full flex-col gap-1">
                    <h6 className="text-sm text-muted-foreground">Lựa chọn khoá học</h6>
                    <Select
                        onValueChange={handleSelectCourse}
                        value={courseId === undefined ? 'all' : courseId.toString()}
                    >
                        <SelectTrigger className="flex w-[300px] items-center justify-between">
                            <SelectValue placeholder="Chọn khoá học" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chọn khoá học</SelectLabel>
                                <SelectItem value="all">Tất cả khoá học</SelectItem>
                                {courseData &&
                                    courseData.map((course: ICourseApproved) => (
                                        <SelectItem key={course.id} value={course.id.toString()}>
                                            {course.name}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex h-full flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Chọn thời gian bắt đầu</span>
                    <DatePicker placeholderText="Ngày bắt đầu" />
                </div>

                <div className="flex h-full flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Chọn thời gian kết thúc</span>
                    <DatePicker placeholderText="Ngày kết thúc" />
                </div>

                <div className="flex h-full items-end">
                    <Button size="lg">Tìm kiếm</Button>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default PurchaseHistory
