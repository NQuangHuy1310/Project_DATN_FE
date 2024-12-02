import { Dispatch, SetStateAction, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import CodeEditor from '@/components/shared/CodeEditor'
import { Button } from '@/components/ui/button'
import { formats, modules } from '@/constants/quillConstants'
import { useGetLessonDetail, useUpdateCodingContent } from '@/app/hooks/instructors'
import { codingContent, codingContentSchema } from '@/validations'

interface LessonCodingContentProps {
    lessonId: number
    setVisible: Dispatch<SetStateAction<boolean>>
}

const LessonCodingContent = ({ lessonId, setVisible }: LessonCodingContentProps) => {
    const {
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<codingContent>({
        resolver: zodResolver(codingContentSchema)
    })

    const { data: lessonData } = useGetLessonDetail(lessonId)
    const { mutateAsync } = useUpdateCodingContent()

    const handleCodeChange = (field: 'output' | 'sample_code') => (value: string) => {
        setValue(field, value)
    }

    const handleChangeContent = (field: 'statement' | 'hints') => (value: string) => {
        setValue(field, value)
    }

    const handleSubmitForm: SubmitHandler<codingContent> = async (data) => {
        const payload = {
            ...data,
            _method: 'PUT'
        }
        await mutateAsync([lessonId!, payload])
        setVisible(false)
    }

    useEffect(() => {
        if (lessonData?.lessonable) {
            reset()
            setValue('statement', lessonData.lessonable.statement)
            setValue('hints', lessonData.lessonable.hints)
            setValue('sample_code', lessonData.lessonable.sample_code!)
            setValue('output', lessonData.lessonable.output!)
        }
    }, [lessonData, setValue, reset])

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-10">
            <div className="flex w-full flex-col gap-4">
                <div className="w-full space-y-1">
                    <label className="text-sm text-muted-foreground">Nhập đề bài cho bài tập của bạn</label>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        onChange={handleChangeContent('statement')}
                        value={getValues('statement')}
                        placeholder="Nhập đề bài cho bài tập..."
                    />
                    {errors.statement && <div className="text-sm text-secondaryRed">{errors.statement.message}</div>}
                </div>

                <div className="flex w-full items-center gap-2 md:flex-wrap">
                    <div className="w-full flex-1 space-y-1">
                        <label className="text-sm text-muted-foreground">Nhập mã nguồn mẫu</label>
                        <CodeEditor
                            height="300px"
                            onChange={handleCodeChange('sample_code')}
                            value={getValues('sample_code')}
                            language={
                                lessonData?.lessonable.language as
                                    | 'javascript'
                                    | 'php'
                                    | 'typescript'
                                    | 'java'
                                    | 'python'
                            }
                        />
                        {errors.sample_code && (
                            <div className="text-sm text-secondaryRed">{errors.sample_code.message}</div>
                        )}
                    </div>
                    <div className="w-full flex-1 space-y-1">
                        <label className="text-sm text-muted-foreground">Nhập giải pháp của bạn</label>
                        <CodeEditor
                            height="300px"
                            onChange={handleCodeChange('output')}
                            value={getValues('output')}
                            language={
                                lessonData?.lessonable.language as
                                    | 'javascript'
                                    | 'php'
                                    | 'typescript'
                                    | 'java'
                                    | 'python'
                            }
                        />
                        {errors.output && <div className="text-sm text-secondaryRed">{errors.output.message}</div>}
                    </div>
                </div>

                <div className="w-full space-y-1">
                    <label className="text-sm text-muted-foreground">Gợi ý cho bài tập của bạn</label>
                    <ReactQuill
                        formats={formats}
                        modules={modules}
                        value={getValues('hints')}
                        onChange={handleChangeContent('hints')}
                        placeholder="Nhập đề bài cho bài tập..."
                    />
                </div>
            </div>
            <div className="mt-auto flex items-center justify-end gap-2">
                <Button variant="destructive" disabled={isSubmitting} onClick={() => setVisible(false)}>
                    Huỷ
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {lessonId ? 'Lưu bài tập' : 'Thêm mới bài tập'}
                </Button>
            </div>
        </form>
    )
}

export default LessonCodingContent
