import { toast } from 'sonner'
import { ChangeEvent, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Banner from '@/assets/banner.png'
import placeholder from '@/assets/placeholder.jpg'
import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { roadMap, roadMapSchema } from '@/validations'
import { readFileAsDataUrl, validateFileSize } from '@/lib'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const Roadmap = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<roadMap>({
        resolver: zodResolver(roadMapSchema)
    })
    const [openDialog, setOpenDialog] = useState<boolean>(false)
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
                <DialogContent className="max-w-screen-lg">
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
                                    {...register('title')}
                                    placeholder="Ví dụ: Lộ trình học Front-end"
                                    disabled={isSubmitting}
                                />
                                {errors.title && (
                                    <div className="text-sm text-secondaryRed">{errors.title.message}</div>
                                )}
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
                                    {...register('long_description')}
                                    placeholder="Ví dụ: Lộ trình Front-end bao gồm các chủ đề như HTML, CSS, JavaScript và các framework phổ biến như React và Vue."
                                    disabled={isSubmitting}
                                />
                                {errors.long_description && (
                                    <div className="text-sm text-secondaryRed">{errors.long_description.message}</div>
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
                                            Vui lòng chọn hình ảnh đại diện cho lộ trình học tập. Hình ảnh nên có định
                                            dạng JPEG, PNG hoặc GIF.
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
        </>
    )
}

export default Roadmap
