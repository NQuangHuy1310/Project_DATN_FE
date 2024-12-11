import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { IRoadmap } from '@/types/instructor'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { roadmapPhase, roadmapPhaseSchema } from '@/validations'
import { useCreatePhase, useGetCoursesApproved } from '@/app/hooks/instructors'
import { getImagesUrl } from '@/lib'

interface AddPhaseProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    roadmap: IRoadmap | undefined
}

const AddPhase = ({ open, setOpen, roadmap }: AddPhaseProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<roadmapPhase>({
        resolver: zodResolver(roadmapPhaseSchema)
    })

    const { data: courseApproved } = useGetCoursesApproved()
    const { mutateAsync: createPhase } = useCreatePhase()

    const [courseIds, setCourseIds] = useState<number[]>([])

    const handleCourseClick = (id: number) => {
        setCourseIds((prev) => (prev.includes(id) ? prev.filter((courseId) => courseId !== id) : [...prev, id]))
    }

    const onSubmit: SubmitHandler<roadmapPhase> = async (data) => {
        if (roadmap) {
            const payload = {
                ...data,
                roadmap_id: roadmap?.id,
                order: roadmap?.phases.length + 1,
                course_ids: courseIds
            }
            await createPhase(payload)
            setOpen(false)
            reset()
            setCourseIds([])
        }
    }

    useEffect(() => {
        return () => {
            reset()
            setCourseIds([])
        }
    }, [reset, open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-screen-lg" aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>
                            Thêm giai đoạn cho lộ trình <span className="text-secondaryGreen">{roadmap?.name}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="space-y-0.5">
                            <label className="text-sm text-muted-foreground">Tên giai đoạn</label>
                            <Input
                                autoFocus
                                type="text"
                                placeholder="VD: Giai đoạn 1 - Khởi đầu"
                                {...register('name')}
                                disabled={isSubmitting}
                            />
                            {errors.name ? (
                                <div className="text-sm text-secondaryRed">{errors.name.message}</div>
                            ) : (
                                <span className="text-xs text-muted-foreground">
                                    Nhập tên cho giai đoạn này để mô tả rõ ràng về nội dung hoặc hoạt động chính.
                                </span>
                            )}
                        </div>

                        <div className="space-y-0.5">
                            <label className="text-sm text-muted-foreground">Mô tả giai đoạn</label>
                            <Textarea
                                placeholder="VD: Trong giai đoạn này, học viên sẽ học các kiến thức cơ bản."
                                rows={3}
                                {...register('description')}
                                disabled={isSubmitting}
                            />
                            {errors.description ? (
                                <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                            ) : (
                                <span className="text-xs text-muted-foreground">
                                    Cung cấp mô tả chi tiết về giai đoạn, bao gồm các mục tiêu và nội dung sẽ được học.
                                </span>
                            )}
                        </div>

                        <div className="space-x-1">
                            {courseApproved && courseApproved.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm text-muted-foreground">
                                            Chọn khoá học cho giai đoạn
                                        </label>
                                        <div className="flex gap-2">
                                            {courseApproved
                                                .filter((item) => !courseIds.includes(item.id))
                                                .map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="cursor-pointer rounded-md border border-grey px-4 py-3"
                                                        onClick={() => handleCourseClick(item.id)}
                                                    >
                                                        <h4>{item.name}</h4>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    {courseIds.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm font-semibold text-secondaryGreen">
                                                Khoá học đã chọn
                                            </label>
                                            <div className="flex items-center gap-2">
                                                {courseApproved
                                                    .filter((item) => courseIds.includes(item.id))
                                                    .map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="size-10 cursor-pointer overflow-hidden rounded-full"
                                                            onClick={() => handleCourseClick(item.id)}
                                                        >
                                                            <img
                                                                src={getImagesUrl(item.thumbnail)}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Chưa có khoá học nào được phê duyệt.</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="flex w-full items-center !justify-between">
                        <Button disabled={isSubmitting}>Tạo khoá học</Button>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => setOpen(false)}
                                disabled={isSubmitting}
                            >
                                Huỷ
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Thêm mới giai đoạn
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPhase
