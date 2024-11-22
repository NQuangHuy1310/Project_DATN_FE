import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGetCourses, useGetStudentsCourse } from '@/app/hooks/instructors'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import noContent from '@/assets/no-content.jpg'

const PerformanceStudents = () => {
    const navigate = useNavigate()
    const [courseId, setCourseId] = useState<number>()

    const { data: courseData } = useGetCourses()
    const { data: studentsCourse } = useGetStudentsCourse(courseId!)

    const handleSelectCourse = (value: string) => {
        setCourseId(+value)
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
        return date.toLocaleDateString('vi-VN', options)
    }

    useEffect(() => {
        if (courseData && courseData.data.length > 0) {
            setCourseId(courseData.data[0].id)
        }
    }, [courseData])

    return (
        <div>
            {courseData && courseData.data.length > 0 ? (
                <div className="flex flex-col gap-5">
                    <Select onValueChange={handleSelectCourse} value={courseId?.toString()}>
                        <SelectTrigger className="flex w-[300px] items-center justify-between">
                            <SelectValue placeholder="Chọn khoá học" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chọn khoá học</SelectLabel>
                                {courseData.data.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex flex-wrap items-center gap-5">
                        {studentsCourse &&
                            studentsCourse.students.data.length > 0 &&
                            studentsCourse.students.data.map((student) => (
                                <div
                                    className="flex min-w-[300px] cursor-pointer flex-col gap-3 rounded-md border border-grey p-4 hover:shadow-sm hover:transition-all"
                                    key={student.id}
                                >
                                    <div className="flex items-center gap-5">
                                        <Avatar className="size-10 cursor-pointer">
                                            <AvatarImage
                                                className="object-cover"
                                                src={getImagesUrl(student.user.avatar || '')}
                                                alt={student.user.name}
                                            />
                                            <AvatarFallback className="bg-slate-500/50 text-xl font-semibold text-white">
                                                {student.user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col gap-0">
                                            <h6 className="text-base font-semibold">{student.user.name}</h6>
                                            <p className="text-sm font-medium">
                                                Tiến độ học tập {student.progress_percent}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p>Thời gian đăng ký: {formatDate(student.created_at)}</p>
                                        {student.completed_at ? (
                                            <p className="text-primary">Đã hoàn thành khoá học</p>
                                        ) : (
                                            <p className="text-secondaryYellow">Chưa hoàn thành khoá học</p>
                                        )}
                                    </div>

                                    <div className="space-x-2">
                                        <Button variant="outline" size="sm">
                                            Xem trang cá nhân
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Nhắn tin
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {studentsCourse?.total_students === 0 && (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img src={noContent} alt="" />
                            <p className="text-base font-medium text-muted-foreground">
                                Khoá học hiện tại chưa có học viên nào
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                    <img src={noContent} alt="" />
                    <p className="text-base font-medium text-muted-foreground">
                        Bạn chưa có khoá học nào, hãy tạo khoá học ngay.
                    </p>
                    <Button size="lg" onClick={() => navigate(routes.createCourse)}>
                        Tạo khoá học mới
                    </Button>
                </div>
            )}
        </div>
    )
}

export default PerformanceStudents
