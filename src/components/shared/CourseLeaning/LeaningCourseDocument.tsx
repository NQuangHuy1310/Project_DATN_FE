import { useUpdateLessonProCess } from '@/app/hooks/courses/useLesson'
import { ILessonLeaning } from '@/types/course/course'
import { Dispatch, SetStateAction, useEffect } from 'react'

const LeaningCourseDocument = ({
    dataLesson,
    setCheckButton
}: {
    dataLesson: ILessonLeaning
    setCheckButton: Dispatch<SetStateAction<boolean>>
}) => {
    const { mutateAsync: lessonProcessUpdate } = useUpdateLessonProCess()
    useEffect(() => {
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
        }, 10000)

        return () => {
            clearTimeout(timer)
        }
    }, [setCheckButton, dataLesson.id, lessonProcessUpdate])
    return (
        <div className="mx-auto max-w-3xl pt-4">
            <div className="flex flex-col gap-5">
                <h2 className="text-xl font-bold">{dataLesson.lessonable!.lesson_title}</h2>
                {dataLesson.content_type === 'document' && 'content' in dataLesson.lessonable! && (
                    <div dangerouslySetInnerHTML={{ __html: dataLesson.lessonable.content! }} />
                )}
            </div>
        </div>
    )
}

export default LeaningCourseDocument
