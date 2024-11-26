import { useUpdateLessonProCess } from '@/app/hooks/courses/useLesson'
import AddQA from '@/components/shared/CourseLeaning/Sheet/AddQA'
import { Button } from '@/components/ui/button'
import { backendUrl } from '@/configs/baseUrl'
import { ILessonLeaning } from '@/types/course/course'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { toast } from 'sonner'

const LeaningCourseDocument = ({
    dataLesson,
    toggleTab,
    setCheckButton
}: {
    dataLesson: ILessonLeaning
    toggleTab: boolean
    setCheckButton: Dispatch<SetStateAction<boolean>>
}) => {
    const [qaSheet, setQASheet] = useState<boolean>(false)
    const { mutateAsync: lessonProcessUpdate } = useUpdateLessonProCess()
    const [loading, setLoading] = useState<boolean>(false)

    // Hàm tính thời gian đọc dựa trên số từ
    const calculateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        return Math.ceil((words / wordsPerMinute) * 60 * 1000)
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
                return res.blob()
            })
            .then((data) => {
                const url = window.URL.createObjectURL(data)
                const a = document.createElement('a')
                a.href = url
                a.download = `${dataLesson.title}.doc`
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
        // Kiểm tra nếu nội dung là document thì mới tính thời gian
        if (dataLesson.content_type === 'document' && 'content' in dataLesson.lessonable!) {
            const readingTime = calculateReadingTime(dataLesson.lessonable.content!)
            const timer = setTimeout(async () => {
                setCheckButton(false)
                await lessonProcessUpdate([
                    dataLesson.id!,
                    {
                        is_completed: 1,
                        last_time_video: null,
                        _method: 'PUT'
                    }
                ])
            }, readingTime)

            return () => clearTimeout(timer)
        }
    }, [setCheckButton, dataLesson.id, dataLesson.content_type, dataLesson.lessonable, lessonProcessUpdate])

    return (
        <div className="mx-auto max-w-3xl pt-4">
            <div className="flex flex-col gap-5">
                <h2 className="text-xl font-bold">{dataLesson.lessonable!.lesson_title}</h2>
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
