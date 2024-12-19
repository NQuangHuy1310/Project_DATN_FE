import ReactQuill from 'react-quill'
import { MdDriveFolderUpload } from 'react-icons/md'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaFileCircleCheck } from 'react-icons/fa6'
import { SubmitHandler, useForm } from 'react-hook-form'

import { showMessage } from '@/lib'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IChangeLessonTypeData } from '@/types/instructor'
import { lessonDoc, lessonDocSchema } from '@/validations'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import {
    useChangeLessonType,
    useCreateLessonDoc,
    useGetLessonDetail,
    useUpdateLessonDoc
} from '@/app/hooks/instructors'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { MessageErrors } from '@/constants'
import { Switch } from '@/components/ui/switch'

const FILE_UPLOAD_MAX_SIZE = 10 * 1024 * 1024

interface LessonDocumentProps {
    courseId?: number
    moduleId?: number
    lessonId?: number
    canEdit?: boolean
    isSelectingLessonType?: boolean
    handleHiddenLesson?: Dispatch<SetStateAction<boolean>>
    setIsEditLesson?: Dispatch<SetStateAction<boolean>>
    setIsSelectingLessonType?: Dispatch<SetStateAction<boolean>>
}

const LessonDocument = ({
    moduleId,
    courseId,
    lessonId,
    canEdit,
    setIsEditLesson,
    handleHiddenLesson,
    isSelectingLessonType,
    setIsSelectingLessonType
}: LessonDocumentProps) => {
    const {
        reset,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<lessonDoc>({
        resolver: zodResolver(lessonDocSchema)
    })
    const { data: lessonData } = useGetLessonDetail(lessonId ? lessonId : 0)
    const { mutateAsync: createLessonDoc } = useCreateLessonDoc()
    const { mutateAsync: updateLessonDoc } = useUpdateLessonDoc()
    const { mutateAsync: changeLessonType } = useChangeLessonType()

    const [openDialogAddFile, setOpenDialogAddFile] = useState<boolean>(false)
    const [fileUpload, setFileUpload] = useState<File | undefined>(undefined)
    const [isPreview, setIsPreview] = useState<boolean>()
    const quillRef = useRef<ReactQuill | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChangeValue = (value: string) => {
        setValue('content', value)
    }

    const handleSetPreview = (value: boolean) => {
        setIsPreview(value)
    }

    const handleSubmitForm: SubmitHandler<lessonDoc> = async (data) => {
        if (canEdit) {
            if (lessonData && !isSelectingLessonType) {
                const payload = {
                    ...data,
                    resourse_path: fileUpload,
                    is_preview: isPreview ? 1 : 0,
                    _method: 'PUT'
                }
                await updateLessonDoc([courseId!, payload])
                setIsEditLesson?.(false)
            } else if (isSelectingLessonType) {
                const payload: IChangeLessonTypeData = {
                    ...data,
                    new_type: 'document'
                }
                await changeLessonType([lessonId!, payload])
                setIsSelectingLessonType?.(false)
            } else {
                const payload = {
                    ...data,
                    resourse_path: fileUpload,
                    is_preview: isPreview ? 1 : 0
                }
                await createLessonDoc([moduleId!, payload])
                handleHiddenLesson?.(false)
            }
            reset()
        } else showMessage()
    }

    const handleClose = () => {
        if (lessonData) setIsEditLesson?.(false)
        else handleHiddenLesson?.(false)
        setIsSelectingLessonType?.(false)
        reset()
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > FILE_UPLOAD_MAX_SIZE) {
                toast.error('File tải lên quá lớn. Vui lòng chọn file nhỏ hơn 10 MB.')
            }

            try {
                setFileUpload(file)
                toast.success('File đã được tải lên thành công!')
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : MessageErrors.uploadFile
                toast.error(errorMessage)
            }
        }
    }

    useEffect(() => {
        if (lessonData) {
            reset()
            const contentData = lessonData.lessonable.content
            setValue('title', lessonData!.title)
            setValue('content', contentData!)
            setIsPreview(lessonData.is_preview === 1)
        }
    }, [lessonData, setValue, reset, lessonId])

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="space-y-3 rounded-lg bg-white p-4">
                    <div className="space-y-1 border-b-[1px] border-grey pb-4">
                        <label className="text-xs text-muted-foreground">
                            Bạn cần nhập tiêu đề cho bài giảng của mình
                        </label>
                        <Input
                            autoFocus
                            className="w-[600px]"
                            {...register('title')}
                            placeholder="Nhập tiêu đề bài giảng"
                        />
                        {errors.title && <div className="text-sm text-red-500">{errors.title.message}</div>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">
                            Bạn cần nhập nội dung cho bài giảng của mình
                        </label>
                        <ReactQuill
                            ref={quillRef}
                            style={{ height: '100%' }}
                            value={getValues('content')}
                            onChange={handleChangeValue}
                            placeholder="Nhập nội dung của bài học"
                        />
                        {errors.content && <div className="text-sm text-red-500">{errors.content.message}</div>}
                    </div>

                    <div className="flex items-center gap-2">
                        <Switch checked={isPreview} onCheckedChange={handleSetPreview} />
                        <label className="text-xs text-muted-foreground">
                            Cho phép người dùng xem trước video này trước khi mua
                        </label>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">
                            Bạn có thể tải lên file đính kèm cho bài học
                        </label>
                        <div className="flex items-center gap-2">
                            <Button
                                className="flex items-center gap-2"
                                type="button"
                                onClick={() => setOpenDialogAddFile(true)}
                            >
                                Tải lên file
                                <MdDriveFolderUpload className="size-5" />
                            </Button>
                            <div className="flex items-center gap-1">
                                <FaFileCircleCheck className="size-5 text-secondaryGreen" />
                                {(fileUpload && fileUpload.name) || (lessonData && lessonData.lessonable.resourse_path)}
                            </div>
                        </div>
                    </div>

                    <div className="space-x-4 text-end">
                        <Button variant="destructive" type="button" disabled={isSubmitting} onClick={handleClose}>
                            Huỷ
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {lessonData ? 'Lưu thông tin' : 'Thêm bài giảng'}
                        </Button>
                    </div>
                </div>
            </form>

            <Dialog open={openDialogAddFile} onOpenChange={setOpenDialogAddFile}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tải lên file cho dự án</DialogTitle>
                        <DialogDescription>Bạn có thể tải các file đính kèm cho dự án ở đây</DialogDescription>
                    </DialogHeader>
                    <div
                        className="flex h-[200px] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed py-4"
                        onClick={() => {
                            if (inputRef.current) inputRef.current.click()
                        }}
                    >
                        <input type="file" hidden ref={inputRef} onChange={(e) => handleFileChange(e)} />
                        <MdOutlineDriveFolderUpload className="size-8 text-primary" />
                        <h6 className="text-base font-semibold">Tải lên file</h6>
                        {fileUpload && <p className="text-sm">Tên file: {fileUpload && fileUpload.name}</p>}
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button type="button" variant="destructive">
                                Huỷ
                            </Button>
                        </DialogClose>
                        <Button type="submit" onClick={() => setOpenDialogAddFile(false)}>
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default LessonDocument
