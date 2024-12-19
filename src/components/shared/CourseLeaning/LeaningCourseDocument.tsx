import { useUpdateLessonProCess } from '@/app/hooks/courses/useLesson'
import AddQA from '@/components/shared/CourseLeaning/Sheet/AddQA'
import { Button } from '@/components/ui/button'
import { backendUrl } from '@/configs/baseUrl'
import { ILessonLeaning } from '@/types/course/course'
import { useEffect, useState } from 'react'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { toast } from 'sonner'

const LeaningCourseDocument = ({
    slug,
    dataLesson,
    toggleTab,
    checkLesson
}: {
    slug: string
    dataLesson: ILessonLeaning
    toggleTab: boolean
    checkLesson: number
}) => {
    const [qaSheet, setQASheet] = useState<boolean>(false)
    const { mutateAsync: lessonProcessUpdate } = useUpdateLessonProCess(slug)
    const [loading, setLoading] = useState<boolean>(false)
    const [remainingTime, setRemainingTime] = useState<number>(0)

    // Hàm tính thời gian đọc dựa trên số từ
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil((words / wordsPerMinute) * 60 * 1000)
    }

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime)
        return `Ngày ${date.getDay()} tháng ${date.getMonth()} năm ${date.getFullYear()}`
    }

    const handleDownloadFile = () => {
        setLoading(true)
        const token = localStorage.getItem('access_token')
        fetch(`${backendUrl}lessons/${dataLesson.id}/download-resourse`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch the file')
                }
                const contentType = res.headers.get('Content-Type')
                return res.blob().then((blob) => ({ blob, contentType }))
            })
            .then(({ blob, contentType }) => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                const extension = contentType?.split('/')[1]
                a.download = `${dataLesson.title}.${extension}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)
                setLoading(false)
            })
            .catch((error) => {
                toast.error('Error downloading file:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        if (dataLesson.content_type === 'document' && 'content' in dataLesson.lessonable!) {
            const readingTime = calculateReadingTime(dataLesson.lessonable.content!)
            setRemainingTime(Math.floor(readingTime / 1000))

            const timer = setTimeout(async () => {
                // setCheckButton(false)
                await lessonProcessUpdate([
                    dataLesson.id!,
                    {
                        is_completed: 1,
                        last_time_video: null,
                        _method: 'PUT'
                    }
                ])
            }, readingTime)

            const interval = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        return 0
                    }
                    return Math.floor(prev - 1)
                })
            }, 1000)

            return () => {
                clearTimeout(timer)
                clearInterval(interval)
            }
        }
    }, [dataLesson.id, dataLesson.content_type, dataLesson.lessonable, lessonProcessUpdate])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="mx-auto max-w-3xl pt-4">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">{dataLesson.title}</h2>
                    <span className="text-darkGrey">{formatDate(dataLesson.created_at)}</span>
                </div>
                {dataLesson.content_type === 'document' && 'content' in dataLesson.lessonable! && (
                    <div dangerouslySetInnerHTML={{ __html: dataLesson.lessonable.content! }} />
                )}
                {dataLesson.lessonable?.resourse_path && (
                    <Button className="w-fit" onClick={handleDownloadFile} disabled={loading}>
                        Tải xuống tải nguyên đính kèm của bài học
                    </Button>
                )}
            </div>
            <div className={`fixed bottom-[70px] z-50 ${toggleTab ? 'right-[2%] lg:right-[25%]' : 'right-[2%]'}`}>
                <Button
                    className="flex h-8 text-[#0056d2] shadow-md md:relative md:!ps-10"
                    variant="secondary"
                    onClick={() => {
                        setQASheet(true)
                    }}
                >
                    <HiOutlineChatAlt2 className="size-7 md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2" />
                    <span className="hidden md:block">Hỏi đáp</span>
                </Button>
            </div>
            {dataLesson.content_type === 'document' && remainingTime > 0 && checkLesson !== 1 && (
                <div
                    className={`fixed top-[80px] z-50 rounded-md bg-darkGrey/30 p-2 text-primary ${toggleTab ? 'right-[2%] lg:right-[25%]' : 'right-[2%]'}`}
                >
                    {formatTime(remainingTime)}
                </div>
            )}
            <AddQA
                commentId={dataLesson?.id}
                open={qaSheet}
                isOpen={(isOpen) => {
                    setQASheet(isOpen)
                }}
            />
        </div>
    )
}

export default LeaningCourseDocument
