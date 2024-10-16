import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import placeholder from '@/assets/placeholder.jpg'
import { ILessonVideoData } from '@/types/instructor'
import { readFileAsDataUrl, validateFileSize } from '@/lib'
import { lessonVideo, lessonVideoSchema } from '@/validations'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateLessonVideo } from '@/app/hooks/instructors'

const LessonVideo = ({
    moduleId,
    handleHiddenLesson
}: {
    moduleId: number
    handleHiddenLesson: Dispatch<SetStateAction<boolean>>
}) => {
    const {
        reset,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<lessonVideo>({
        resolver: zodResolver(lessonVideoSchema)
    })

    const { mutateAsync: createLessonVideo } = useCreateLessonVideo()

    const [selectedVideoType, setSelectedVideoType] = useState<string>('')
    const [courseVideoFile, setCourseVideoFile] = useState<File | undefined>(undefined)
    const [courseVideoPath, setCourseVideoPath] = useState<string | undefined>(undefined)
    const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)
    const courseVideo = useRef<HTMLInputElement | null>(null)
    const quillRef = useRef<ReactQuill>(null)

    const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFileSize(file, 'video')) {
            try {
                setCourseVideoFile(file)
                const videoUrl = await readFileAsDataUrl(file)
                setCourseVideoPath(videoUrl)
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

    const handleChangeValue = (value: string) => {
        setValue('description', value)
    }

    const handleSubmitForm: SubmitHandler<lessonVideo> = async (data) => {
        if (!videoUrl && !courseVideoFile) {
            toast.error('Vui lòng tải lên video dạng file, hoặc link youtube!')
            return
        }

        const payload: ILessonVideoData = {
            ...data,
            duration: 0,
            check: undefined,
            video_youtube_id: videoUrl || '',
            video: courseVideoFile || undefined
        }

        if (videoUrl) {
            payload.check = 'url'
            payload.video_youtube_id = videoUrl
        }

        if (courseVideoFile) {
            payload.check = 'upload'
            payload.video = courseVideoFile
            payload.video_youtube_id = undefined
        }

        await createLessonVideo([moduleId, payload])
        handleHiddenLesson(false)
        reset()
    }

    return (
        <div className="space-y-2 rounded-lg bg-white p-4">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="space-y-1 border-b-[1px] border-grey pb-4">
                    <label className="text-xs text-muted-foreground">Bạn cần nhập tiêu đề cho bài giảng của mình</label>
                    <Input
                        placeholder="Nhập tiêu đề bài giảng"
                        className="w-[600px]"
                        {...register('title')}
                        autoFocus
                    />
                    {errors.title && <div className="text-sm text-red-500">{errors.title.message}</div>}
                </div>
                <Tabs defaultValue="video">
                    <label className="text-xs text-muted-foreground">
                        Bạn cần nhập nội dung cho bài giảng bằng cách tải lên video hoặc dùng video trên youtube
                    </label>
                    <TabsList className="grid w-[450px] grid-cols-2">
                        <TabsTrigger value="video">Nội dung</TabsTrigger>
                        <TabsTrigger value="description">Mô tả</TabsTrigger>
                    </TabsList>
                    <div className="bg-white p-3">
                        {/* Handle video */}
                        <TabsContent value="video" className="flex flex-col gap-4">
                            <Select value={selectedVideoType} onValueChange={setSelectedVideoType}>
                                <SelectTrigger className="flex w-[450px] items-center justify-between">
                                    <SelectValue placeholder="Chọn kiểu video" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="upload">Tải lên video</SelectItem>
                                        <SelectItem value="video">Nhúng video từ youtube</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {/* Handle Upload Video */}
                            {selectedVideoType === 'upload' && (
                                <div className="flex flex-col gap-2">
                                    <h5 className="text-base font-bold">Tải lên video cho khoá học</h5>
                                    <div className="flex flex-col-reverse items-start gap-4">
                                        <div className="h-[300px] w-[500px] flex-shrink-0 overflow-hidden rounded-md border-[1px]">
                                            {courseVideoPath ? (
                                                <video
                                                    src={courseVideoPath}
                                                    controls
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={placeholder}
                                                    alt="Course image"
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex w-[600px] flex-col gap-1">
                                            <div className="flex h-[44px] items-center">
                                                <Input
                                                    type="file"
                                                    accept="video/*"
                                                    ref={courseVideo}
                                                    placeholder="Tải lên hình ảnh"
                                                    onChange={(e) => handleUploadVideo(e)}
                                                    className="flex h-full cursor-pointer items-start justify-center rounded-e-none"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="h-full rounded-s-none"
                                                    onClick={() => handleButtonClick(courseVideo)}
                                                >
                                                    Tải video lên
                                                </Button>
                                            </div>
                                            <p className="text-xs leading-6">
                                                Lưu ý: Tất cả các file phải có dung lượng ít nhất là 720p và nhỏ hơn 2GB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedVideoType === 'video' && (
                                <div className="flex flex-col gap-4">
                                    <div className="space-y-2">
                                        <h5 className="text-base font-bold">Gắn link video youtube</h5>
                                        <div className="w-[450px]">
                                            <Input
                                                placeholder="Nhập mã code video từ Youtube"
                                                onChange={(e) => setVideoUrl(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="h-[300px] w-[500px]">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoUrl}`}
                                            title="YouTube video player"
                                            className="h-full w-full rounded-lg"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="description">
                            <ReactQuill
                                ref={quillRef}
                                value={getValues('description')}
                                onChange={handleChangeValue}
                                placeholder="Thêm mô tả, trình bày những việc học viên có thể làm sau khi hoàn thành bải giảng"
                                style={{ height: '100%' }}
                            />
                            {errors.description && (
                                <div className="text-sm text-red-500">{errors.description.message}</div>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>
                <div className="space-x-4 text-end">
                    <Button variant="destructive" disabled={isSubmitting}>
                        Huỷ
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        Thêm bài giảng
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LessonVideo
