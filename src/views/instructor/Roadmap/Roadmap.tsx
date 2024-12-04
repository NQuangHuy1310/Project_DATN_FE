import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGetCoursesApproved } from '@/app/hooks/instructors'

import Banner from '@/assets/banner.png'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { roadMap, roadMapSchema } from '@/validations'

const Roadmap = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<roadMap>({
        resolver: zodResolver(roadMapSchema)
    })

    const { data: courseData } = useGetCoursesApproved()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedCourse, setSelectedCourse] = useState<number[]>([])

    const onSubmit: SubmitHandler<roadMap> = async (formData) => {}

    return (
        <>
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex max-w-[900px] flex-shrink-0 flex-col gap-4">
                        <div className="w-full flex-shrink-0 space-y-3">
                            <h5 className="text-2xl font-extrabold">Lộ Trình Học Tập</h5>
                            <p className="text-sm">
                                Bạn sẽ thiết kế lộ trình học tập chi tiết, giúp học viên dễ dàng theo dõi và đạt được
                                mục tiêu học tập. Hãy chuẩn bị cho một lộ trình thú vị và bổ ích, nơi bạn sẽ phát triển
                                kỹ năng và kiến thức cần thiết để thành công!
                            </p>
                        </div>
                        <div className="flex-1">
                            <Button size="lg" onClick={() => setOpenDialog(!openDialog)}>
                                Thêm mới lộ trình
                            </Button>
                        </div>
                    </div>
                    <div className="h-[300px] w-fit">
                        <img src={Banner} alt="Banner" className="h-full w-full rounded-md object-cover shadow-lg" />
                    </div>
                </div>

                <div className=""></div>
                <div className=""></div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-[700px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Thêm lộ trình</DialogTitle>
                            <DialogDescription>
                                Vui lòng nhập thông tin chi tiết về lộ trình học tập mới. Điều này sẽ giúp học viên dễ
                                dàng theo dõi và đạt được mục tiêu học tập của họ.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2.5">
                            <div className="space-y-0.5">
                                <label className="text-sm text-muted-foreground">Nhập tên lộ trình học tập</label>
                                <Input
                                    autoFocus
                                    type="text"
                                    {...register('title')}
                                    placeholder="Ví dụ: Lộ trình học Front-end"
                                    disabled={isSubmitting}
                                />
                                {errors.title && (
                                    <div className="text-sm text-secondaryRed">{errors.title.message}</div>
                                )}
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-sm text-muted-foreground">Mô tả ngắn gọn về lộ trình này</label>
                                <Textarea
                                    rows={3}
                                    {...register('description')}
                                    placeholder="Ví dụ: Front-end là người xây dựng giao diện website..."
                                    disabled={isSubmitting}
                                />
                                {errors.description && (
                                    <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                                )}
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-sm text-muted-foreground">
                                    Chọn các khoá học trong lộ trình này
                                </label>

                                <div className="flex items-center gap-2">
                                    {courseData?.length ? (
                                        courseData.map((course) => {
                                            const isSelected = selectedCourse.includes(course.id)
                                            return (
                                                <div
                                                    key={course.id}
                                                    className={`cursor-pointer rounded-md border p-3 text-sm font-medium ${isSelected ? 'bg-secondaryGreen/90 text-white' : 'border-grey'}`}
                                                    onClick={() =>
                                                        setSelectedCourse((prev) =>
                                                            isSelected
                                                                ? prev.filter((id) => id !== course.id)
                                                                : [...prev, course.id]
                                                        )
                                                    }
                                                >
                                                    {course.name}
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <p className="text-sm text-secondaryRed">
                                            Bạn không có khoá học nào để chọn, vui lòng tạo khoá học mới.
                                        </p>
                                    )}
                                </div>

                                {selectedCourse.length === 0 && courseData && courseData?.length > 0 && (
                                    <p className="text-sm text-secondaryRed">Bạn cần chọn ít nhất một khóa học.</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="flex w-full items-center !justify-between">
                            <Button type="button">Tạo khoá học</Button>
                            <div className="flex items-center gap-4">
                                <Button type="submit" onClick={() => setOpenDialog(false)} variant="destructive">
                                    Huỷ
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    Lưu thông tin
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Roadmap
