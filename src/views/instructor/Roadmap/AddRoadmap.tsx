import { toast } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateRoadmap } from '@/app/hooks/instructors'

import placeholder from '@/assets/placeholder.jpg'
import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { roadMap, roadMapSchema } from '@/validations'
import { readFileAsDataUrl, validateFileSize } from '@/lib'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface AddRoadmapProps {
    openDialog: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const AddRoadmap = ({ openDialog, setOpenDialog }: AddRoadmapProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<roadMap>({
        resolver: zodResolver(roadMapSchema)
    })

    const { mutateAsync: createRoadmap } = useCreateRoadmap()

    const [courseImageFile, setCourseImageFile] = useState<File>()
    const [courseImagePath, setCourseImagePath] = useState<string | undefined>(placeholder)
    const courseImage = useRef<HTMLInputElement | null>(null)

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'image')) {
            try {
                setCourseImageFile(file)
                const imageUrl = await readFileAsDataUrl(file)
                setCourseImagePath(imageUrl)
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    const handleButtonClick = (inputRef: React.RefObject<HTMLInputElement>) => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const onSubmit: SubmitHandler<roadMap> = async (formData) => {
        if (!courseImageFile) {
            toast.warning('Bạn cần tải lên hình ảnh cho lộ trình học tập.', {
                description: 'Vui lòng chọn một hình ảnh phù hợp trước khi lưu thông tin lộ trình.'
            })
            return
        }

        const payload = {
            ...formData,
            thumbnail: courseImageFile
        }

        await createRoadmap(payload)
        setOpenDialog(false)
        reset()
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="max-w-screen-lg" aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Tạo lộ trình học tập</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2.5">
                        <div className="space-y-0.5">
                            <label className="text-sm text-muted-foreground">Nhập tên lộ trình học tập</label>
                            <Input
                                autoFocus
                                type="text"
                                {...register('name')}
                                placeholder="Ví dụ: Lộ trình học Front-end"
                                disabled={isSubmitting}
                            />
                            {errors.name && <div className="text-sm text-secondaryRed">{errors.name.message}</div>}
                        </div>

                        <div className="space-y-0.5">
                            <label className="text-sm text-muted-foreground">Mô Tả Ngắn Gọn</label>
                            <Textarea
                                rows={3}
                                {...register('sort_description')}
                                placeholder="Ví dụ: Lộ trình này giúp học viên nắm vững các kiến thức cơ bản về Front-end."
                                disabled={isSubmitting}
                            />
                            {errors.sort_description && (
                                <div className="text-sm text-secondaryRed">{errors.sort_description.message}</div>
                            )}
                        </div>

                        <div className="space-y-0.5">
                            <label className="text-sm text-muted-foreground">Mô Tả Chi Tiết</label>
                            <Textarea
                                rows={3}
                                {...register('description')}
                                placeholder="Ví dụ: Lộ trình Front-end bao gồm các chủ đề như HTML, CSS, JavaScript và các framework phổ biến như React và Vue."
                                disabled={isSubmitting}
                            />
                            {errors.description && (
                                <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                            )}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <label className="text-sm text-muted-foreground">Hình Ảnh Lộ Trình</label>
                            <div className="flex items-start gap-8">
                                <div className="h-[250px] w-[350px] flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                                    <img
                                        src={courseImagePath ?? placeholder}
                                        alt="Hình ảnh lộ trình"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex w-[450px] flex-col gap-3">
                                    <div className="flex h-[44px] items-center">
                                        <Input
                                            type="file"
                                            ref={courseImage}
                                            accept="image/jpeg, image/png, image/gif"
                                            onChange={(e) => handleUploadImage(e)}
                                            className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-full rounded-s-none"
                                            onClick={() => handleButtonClick(courseImage)}
                                        >
                                            Tải Lên Hình Ảnh
                                        </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Vui lòng chọn hình ảnh đại diện cho lộ trình học tập. Hình ảnh nên có định dạng
                                        JPEG, PNG hoặc GIF.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex w-full items-center !justify-between">
                        <Button type="button" disabled={isSubmitting}>
                            Tạo khoá học
                        </Button>
                        <div className="flex items-center gap-4">
                            <Button
                                type="button"
                                onClick={() => setOpenDialog(false)}
                                variant="destructive"
                                disabled={isSubmitting}
                            >
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
    )
}

export default AddRoadmap
