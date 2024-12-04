import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useCreateLessonCoding, useGetLessonDetail, useUpdateLessonCoding } from '@/app/hooks/instructors'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SUPPORTED_LANGUAGES } from '@/constants/language'
import { lessonCoding, lessonCodingSchema } from '@/validations'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { showMessage } from '@/lib'

interface LessonCodingProps {
    moduleId: number
    setVisible: Dispatch<SetStateAction<boolean>>
    lessonId?: number
    setLessonID: Dispatch<SetStateAction<number | undefined>>
    canEdit: boolean
}

const LessonCodingInfo = ({ moduleId, setVisible, lessonId, setLessonID, canEdit }: LessonCodingProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<lessonCoding>({
        resolver: zodResolver(lessonCodingSchema)
    })

    const { data: lessonData } = useGetLessonDetail(lessonId ?? 0)
    const { mutateAsync: createLessonCoding } = useCreateLessonCoding()
    const { mutateAsync: updateLessonCoding } = useUpdateLessonCoding()
    const [selectedLanguage, setSelectedLanguage] = useState<string>(lessonData?.lessonable.language ?? '')

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value)
        setValue('language', value)
    }

    const handleSubmitForm: SubmitHandler<lessonCoding> = async (formData) => {
        if (canEdit) {
            const mutate = lessonId ? updateLessonCoding : createLessonCoding
            if (lessonId) {
                const payload = {
                    ...formData,
                    _method: 'PUT'
                }
                await mutate([lessonId, payload])
            } else {
                const response = await mutate([moduleId, formData])
                setLessonID(response.id)
            }
            reset()
        } else showMessage()
    }

    const handleClose = () => {
        reset()
        setVisible(false)
        setLessonID(undefined)
        setSelectedLanguage('')
    }

    useEffect(() => {
        if (lessonId && lessonData) {
            reset()
            setSelectedLanguage(lessonData.lessonable.language ?? '')
            setValue('title', lessonData.title ?? '')
            setValue('description', lessonData.description ?? '')
            setValue('language', lessonData.lessonable.language ?? '')
        }
    }, [lessonData, setValue, reset, lessonId])

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="mx-auto flex max-w-[767px] flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">Lập kế hoạch cho bài tập</h3>
                    <p>
                        <strong>Bài tập Coding </strong> cho phép học viên của bạn thực hành một phần công việc thực tế
                        được nhắm vào mục tiêu và nhận phản hồi ngay lập tức. Bạn nên làm theo các bước sau đây: Lập kế
                        hoạch cho bài tập, xác định giải pháp và chỉ dẫn học viên. Điều này sẽ đảm bảo bạn định hình
                        được vấn đề và cung cấp hướng dẫn cần thiết có lưu ý đến giải pháp.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-muted-foreground">Tên bài tập</label>
                        <Input
                            autoFocus
                            type="text"
                            {...register('title')}
                            placeholder="Đặt tên cho bài tập này dành cho học viên."
                            disabled={isSubmitting}
                        />
                        {errors.title && <div className="text-sm text-secondaryRed">{errors.title.message}</div>}
                    </div>

                    <Select value={selectedLanguage} onValueChange={handleLanguageChange} disabled={isSubmitting}>
                        <div className="flex flex-col gap-0.5">
                            <label className="text-sm text-muted-foreground">Chọn ngôn ngữ cho bài tập</label>
                            <SelectTrigger className="flex h-10 w-full items-center justify-between">
                                <SelectValue placeholder="Chọn ngôn ngữ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_LANGUAGES.map((language) => (
                                        <SelectItem value={language.value} key={language.value}>
                                            {language.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                            {errors.language && (
                                <div className="text-sm text-secondaryRed">{errors.language.message}</div>
                            )}
                            {lessonData && (
                                <span className="text-xs text-muted-foreground">
                                    Nếu bạn thay đổi ngôn ngữ thì mã nguồn của bạn sẽ bị xoá.
                                </span>
                            )}
                        </div>
                    </Select>

                    <div className="flex flex-col gap-0.5">
                        <label className="text-sm text-muted-foreground">Mục tiêu học tập</label>
                        <Textarea
                            {...register('description')}
                            placeholder="Cung cấp một mục tiêu cho bài  tập coding này."
                            rows={3}
                            disabled={isSubmitting}
                        />
                        {errors.description && (
                            <div className="text-sm text-secondaryRed">{errors.description.message}</div>
                        )}
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-end gap-2">
                    <Button type="button" variant="destructive" onClick={handleClose}>
                        Huỷ
                    </Button>
                    <Button type="submit">{lessonId === undefined ? 'Thêm mới bài tập' : 'Lưu bài tập'}</Button>
                </div>
            </form>
        </>
    )
}

export default LessonCodingInfo
