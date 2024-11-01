import { toast } from 'sonner'
import ReactQuill from 'react-quill'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { MessageErrors } from '@/constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import placeholder from '@/assets/placeholder.jpg'
import { ILessonVideoData } from '@/types/instructor'
import { getImagesUrl, readFileAsDataUrl, validateFileSize } from '@/lib'
import { lessonVideo, lessonVideoSchema } from '@/validations'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateLessonVideo, useGetLessonDetail, useUpdateLessonVideo } from '@/app/hooks/instructors'

interface LessonVideoProps {
    moduleId?: number
    courseId?: number
    lessonId?: number
    setIsEditLesson?: Dispatch<SetStateAction<boolean>>
    handleHiddenLesson?: Dispatch<SetStateAction<boolean>>
    setIsSelectingLessonType?: Dispatch<SetStateAction<boolean>>
}

const LessonVideo = ({
    moduleId,
    handleHiddenLesson,
    lessonId,
    setIsEditLesson,
    courseId,
    setIsSelectingLessonType
}: LessonVideoProps) => {
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

    const { data: lessonData } = useGetLessonDetail(lessonId ? lessonId : 0)
    const { mutateAsync: createLessonVideo } = useCreateLessonVideo()
    const { mutateAsync: updateLessonVideo } = useUpdateLessonVideo()

    const [selectedVideoType, setSelectedVideoType] = useState<string>('')
    const [courseVideoFile, setCourseVideoFile] = useState<File | undefined>(undefined)
    const [courseVideoPath, setCourseVideoPath] = useState<string | undefined>(undefined)
    const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)
    const courseVideo = useRef<HTMLInputElement | null>(null)
    const quillRef = useRef<ReactQuill>(null)

    const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleButtonClick = (inputRef: RefObject<HTMLInputElement>) => {
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
            check: undefined
        }

        if (videoUrl) {
            payload.check = 'url'
            payload.video_youtube_id = videoUrl
        }

        if (courseVideoFile) {
            payload.check = 'upload'
            payload.video = courseVideoFile
            payload.duration = 0
        }

        if (lessonData) {
            payload._method = 'PUT'
            await updateLessonVideo([courseId!, payload])
            setIsEditLesson?.(false)
        } else {
            await createLessonVideo([moduleId!, payload])
            handleHiddenLesson?.(false)
        }
        reset()
    }

    const handleClose = () => {
        if (lessonData) setIsEditLesson?.(false)
        else handleHiddenLesson?.(false)
        setIsSelectingLessonType?.(false)
    }

    useEffect(() => {
        if (lessonData) {
            setValue('title', lessonData.title)
            setValue('description', lessonData.description!)
            if (lessonData?.lessonable?.type === 'upload') {
                const videoUrl = getImagesUrl(lessonData.lessonable?.url ?? '')
                setSelectedVideoType(lessonData?.lessonable?.type ?? '')
                setCourseVideoPath(videoUrl)
            } else {
                setSelectedVideoType(lessonData?.lessonable?.type ?? '')
                setVideoUrl(lessonData.lessonable?.video_youtube_id ?? '')
            }
        }
    }, [lessonData, setValue])

    return (
        <div className="space-y-2 rounded-lg bg-white p-4">
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 border-b-[1px] border-grey pb-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">
                                Bạn cần nhập tiêu đề cho bài giảng của mình
                            </label>
                            <Input
                                placeholder="Nhập tiêu đề bài giảng"
                                className="w-[600px]"
                                {...register('title')}
                                autoFocus
                            />
                            {errors.title && <div className="text-sm text-red-500">{errors.title.message}</div>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Thêm mô tả cho bài giảng của bạn</label>
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
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 bg-white">
                        <h5 className="text-base font-semibold">Tải lên video cho khoá học</h5>

                        {/* Handle video */}
                        <Select value={selectedVideoType} onValueChange={setSelectedVideoType}>
                            <SelectTrigger className="flex w-[500px] items-center justify-between">
                                <SelectValue placeholder="Chọn kiểu video muốn tải lên" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="upload">Tải lên video</SelectItem>
                                    <SelectItem value="url">Nhúng video từ youtube</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Handle Upload Video */}
                        {selectedVideoType === 'upload' && (
                            <div className="flex flex-col gap-2">
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
                                    <div className="flex flex-col gap-1">
                                        <div className="flex h-[44px] items-center">
                                            <Input
                                                type="file"
                                                accept="video/*"
                                                ref={courseVideo}
                                                placeholder="Tải lên hình ảnh"
                                                onChange={(e) => handleUploadVideo(e)}
                                                className="flex h-full !w-[500px] cursor-pointer items-start justify-center rounded-e-none"
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

                        {selectedVideoType === 'url' && (
                            <div className="flex flex-col gap-4">
                                <div className="space-y-2">
                                    <h5 className="text-base font-bold">Gắn link video youtube</h5>
                                    <div className="w-[450px]">
                                        <Input
                                            placeholder="Nhập mã code video từ Youtube"
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            value={videoUrl}
                                            className="w-[500px]"
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
                    </div>
                </div>

                <div className="space-x-4 text-end">
                    <Button variant="destructive" disabled={isSubmitting} type="button" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {lessonData ? 'Lưu bài học' : ' Thêm bài giảng'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LessonVideo
