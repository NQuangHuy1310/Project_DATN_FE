import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

import { FaCirclePlay } from 'react-icons/fa6'
import { HiDocument } from 'react-icons/hi'

import CodeEditor from '@/components/shared/CodeEditor/CodeEditor'
import { Button } from '@/components/ui/button'
import iconLoading from '@/assets/loading.svg'
import { ILessonLeaning } from '@/types/course/course'
import { LANGUAGE_VERSIONS } from '@/constants/language'
import { useCheckCodeLeaning } from '@/app/hooks/courses/useLesson'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const LeaningCourseCoding = ({
    slug,
    dataLesson,
    checkLesson
}: {
    slug: string
    dataLesson: ILessonLeaning
    checkLesson: number
    toggleTab: boolean
}) => {
    const [output, setOutput] = useState<string[] | null>(null)
    const [outputCheck, setOutputCheck] = useState<string | null>(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [sourceCode, setSourceCode] = useState<string>(() => {
        const savedCode = localStorage.getItem(`sourceCode&id=${dataLesson.id}`)
        return savedCode || dataLesson.lessonable?.sample_code || ''
    })

    const { mutateAsync: checkCodeLearning } = useCheckCodeLeaning(dataLesson.id, slug)

    const handleCodeChange = (value: string) => {
        setSourceCode(value)
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem(`sourceCode&id=${dataLesson.id}`, sourceCode)
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [sourceCode])

    const runCode = async (): Promise<string | null> => {
        if (isLoading) return null

        const language = dataLesson?.lessonable?.language
        if (!dataLesson.lessonable?.sample_code) return null

        try {
            setIsLoading(true)
            const { data: result } = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: language,
                version: LANGUAGE_VERSIONS[language as 'javascript' | 'php' | 'typescript' | 'java' | 'python'],
                files: [
                    {
                        content: sourceCode
                    }
                ]
            })

            const output = result.run.output.trim()
            setOutputCheck(output)
            setOutput(output.split('\n'))
            setIsError(!!result.stderr)
            return output
        } catch (error: any) {
            setIsError(true)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime)
        return `Ngày ${date.getDay()} tháng ${date.getMonth()} năm ${date.getFullYear()}`
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault()
                runCode()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [sourceCode])

    const checkCodeLesson = async () => {
        let output = outputCheck
        setIsCheck(true)
        if (!output) {
            toast.info('Đang kiểm tra ...')
            output = await runCode()
        }

        if (output) {
            try {
                await checkCodeLearning([dataLesson.lessonable?.id!, output.trim()])
                setIsCheck(false)
            } catch (error) {
                setIsCheck(false)
            }
        } else {
            toast.error('Đã xảy ra lỗi khi kiểm tra mã. Vui lòng thử lại!')
        }
    }

    return (
        <div>
            <div className="grid grid-cols-2">
                <Tabs defaultValue="content">
                    <TabsList className="grid w-full grid-cols-2 border-b p-0">
                        <TabsTrigger value="content" className="flex w-full max-w-full items-center gap-2 text-lg">
                            <HiDocument className="size-5 text-primary" />
                            Nội dung
                        </TabsTrigger>
                        <TabsTrigger value="web" className="flex w-full max-w-full items-center gap-2 text-lg">
                            <FaCirclePlay className="size-5 text-primary" />
                            Trình duyệt
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="overflow-y-auto px-5">
                        <div className="flex flex-col gap-1 py-5">
                            <h2 className="text-3xl font-semibold">{dataLesson.title}</h2>
                            <span className="text-darkGrey">{formatDate(dataLesson.created_at)}</span>
                        </div>
                        <div
                            className="text-base"
                            dangerouslySetInnerHTML={{ __html: dataLesson?.lessonable?.statement || '' }}
                        />
                        <div className="mt-4">
                            <span className="text-base font-semibold">Gợi ý:</span>
                            <div
                                className="text-base"
                                dangerouslySetInnerHTML={{ __html: dataLesson?.lessonable?.hints || '' }}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="web" className="relative min-h-[70vh] px-5">
                        {isLoading ? (
                            <div className="absolute inset-0 top-1/2 z-[999] flex -translate-y-1/4 justify-center bg-opacity-50">
                                <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4">
                                    <div className="h-[80px] w-[80px]">
                                        <img src={iconLoading} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {isError && <p>Error occurred during execution.</p>}
                                {output ? (
                                    output.map((line, i) => <div key={i}>{line}</div>)
                                ) : (
                                    <p className="mx-auto mt-5 max-w-[300px] text-center text-base text-darkGrey">
                                        Nếu có file index.html thì nội dung của nó sẽ được hiển thị tại đây.
                                    </p>
                                )}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

                <div className="border-l">
                    <CodeEditor
                        language={dataLesson.lessonable?.language!}
                        height="56vh"
                        onChange={handleCodeChange}
                        value={sourceCode}
                    />
                    <div className="relative h-[27vh]">
                        <div className="flex items-center justify-between border px-5 py-1">
                            <p>Bài kiểm tra</p>
                            <div className="flex gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className="h-8" onClick={runCode} disabled={isLoading}>
                                                Chạy
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>Bạn có thể ấn Ctrl + S</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button
                                    className="h-8"
                                    onClick={checkCodeLesson}
                                    disabled={isLoading || checkLesson === 1 ? true : false || isCheck}
                                >
                                    Kiểm tra
                                </Button>
                            </div>
                        </div>
                        {isLoading ? (
                            <div className="absolute inset-0 top-1/2 z-[999] flex -translate-y-1/4 justify-center bg-opacity-50">
                                <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4">
                                    <div className="h-[50px] w-[50px]">
                                        <img src={iconLoading} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4">
                                {isError && <p>Error occurred during execution.</p>}
                                {output ? (
                                    output.map((line, i) => <div key={i}>{line}</div>)
                                ) : (
                                    <p className="mx-auto mt-5 max-w-[300px] text-center text-base text-darkGrey">
                                        Nội dung sẽ được hiển thị tại đây.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaningCourseCoding
