import ReactQuill from 'react-quill'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import CodeEditor from '@/components/shared/CodeEditor'
import { Button } from '@/components/ui/button'
import { formats, modules } from '@/constants/quillConstants'
import { useGetLessonDetail, useUpdateCodingContent } from '@/app/hooks/instructors'
import { codingContent, codingContentSchema } from '@/validations'
import { toast } from 'sonner'
import { LANGUAGE_VERSIONS } from '@/constants/language'
import axios from 'axios'

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
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [output, setOutput] = useState<string>(lessonData?.lessonable.output ?? '')

    const handleCodeChange = (field: 'result_code' | 'sample_code') => (value: string) => {
        setValue(field, value)
    }

    const handleChangeContent = (field: 'statement' | 'hints') => (value: string) => {
        setValue(field, value)
    }

    const runCode = async () => {
        const language = lessonData?.lessonable.language
        const sourceCode = getValues('result_code')
        if (!sourceCode) return
        try {
            setIsLoading(true)
            const { data: result } = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: language,
                version: LANGUAGE_VERSIONS[language as 'javascript' | 'php' | 'typescript' | 'java' | 'python'],
                files: [{ content: sourceCode }]
            })
            if (result.run.stdout) {
                setOutput(result.run.output)
                setError('')
            } else {
                setError(result.run.stderr)
                setOutput('')
            }
            setIsLoading(false)
            toast.success('Chạy code thành công!')
        } catch {
            toast.error('Có lỗi trong lúc chạy code. Vui lòng kiểm tra lại mã nguồn của bạn.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        reset()
        setVisible(false)
    }

    const handleSubmitForm: SubmitHandler<codingContent> = async (data) => {
        if (!output) {
            toast.error('Bạn cần kiểm tra code trước khi lưu bài tập!')
            return
        }

        if (error) {
            toast.error('Code có lỗi, vui lòng kiểm tra trước khi lưu bài tập!')
            return
        }

        const payload = {
            ...data,
            output: output.trim(),
            _method: 'PUT'
        }

        await mutateAsync([lessonId!, payload])
        setVisible(false)
        reset()
    }

    useEffect(() => {
        if (lessonData?.lessonable) {
            reset()
            setValue('statement', lessonData.lessonable.statement)
            setValue('hints', lessonData.lessonable.hints)
            setValue('sample_code', lessonData.lessonable.sample_code!)
            setValue('result_code', lessonData.lessonable.result_code!)
        }
    }, [lessonData, setValue, reset])

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-10 p-2">
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

                <div className="flex w-full items-start gap-2">
                    <div className="w-full flex-1 space-y-1">
                        <label className="te const [output, setOutput] = useState<string>('')xt-muted-foreground text-sm">
                            Nhập mã nguồn mẫu
                        </label>
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
                            onChange={handleCodeChange('result_code')}
                            value={getValues('result_code')}
                            language={
                                lessonData?.lessonable.language as
                                    | 'javascript'
                                    | 'php'
                                    | 'typescript'
                                    | 'java'
                                    | 'python'
                            }
                        />
                        {errors.result_code && (
                            <div className="text-sm text-secondaryRed">{errors.result_code.message}</div>
                        )}
                    </div>
                </div>

                {output && (
                    <div className="space-y-1">
                        <label className="te const [output, setOutput] = useState<string>('')xt-muted-foreground text-sm">
                            Kết quả chạy code
                        </label>
                        <div className="h-[40px] truncate rounded-md bg-black/90 p-2 text-white">
                            <p className="text-sm">{output}</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="space-y-1">
                        <label className="te const [output, setOutput] = useState<string>('')xt-muted-foreground text-sm">
                            Lỗi khi chạy code
                        </label>
                        <div className="h-[40px] truncate rounded-md bg-secondaryRed/90 p-2 text-white">
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}

                <div className="w-full space-y-1">
                    <label className="text-sm text-muted-foreground">Gợi ý cho bài tập của bạn</label>
                    <ReactQuill
                        formats={formats}
                        modules={modules}
                        value={getValues('hints')}
                        onChange={handleChangeContent('hints')}
                        placeholder="Nhập gợi ý cho bài tập"
                    />
                </div>
            </div>
            <div className="mt-auto flex items-center justify-end gap-2">
                <Button type="button" variant="destructive" disabled={isSubmitting || isLoading} onClick={handleClose}>
                    Huỷ
                </Button>
                <Button disabled={isSubmitting || isLoading} onClick={() => runCode()}>
                    Kiểm tra code
                </Button>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                    {lessonId === undefined ? 'Thêm mới bài tập' : 'Lưu bài tập'}
                </Button>
            </div>
        </form>
    )
}

export default LessonCodingContent
