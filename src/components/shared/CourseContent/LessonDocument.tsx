import ReactQuill from 'react-quill'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { lessonDoc, lessonDocSchema } from '@/validations'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useCreateLessonDoc } from '@/app/hooks/instructors'

interface LessonDocumentProps {
    moduleId: number
    handleHiddenLesson: Dispatch<SetStateAction<boolean>>
}

const LessonDocument = ({ moduleId, handleHiddenLesson }: LessonDocumentProps) => {
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
    const { mutateAsync: createLessonDoc } = useCreateLessonDoc()
    const quillRef = useRef<ReactQuill>(null)

    const handleChangeValue = (value: string) => {
        setValue('content', value)
    }

    const handleSubmitForm: SubmitHandler<lessonDoc> = async (data) => {
        await createLessonDoc([moduleId, data])
        handleHiddenLesson(false)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="space-y-2 rounded-lg bg-white p-4">
                <div className="space-y-1 border-b-[1px] border-grey pb-4">
                    <label className="text-xs text-muted-foreground">Bạn cần nhập tiêu đề cho bài giảng của mình</label>
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
                <div className="space-x-4 text-end">
                    <Button variant="destructive" type="button" disabled={isSubmitting}>
                        Huỷ
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        Thêm bài giảng
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default LessonDocument
