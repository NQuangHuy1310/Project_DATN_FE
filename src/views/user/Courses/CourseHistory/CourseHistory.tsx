import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoIosPlayCircle } from 'react-icons/io'
import { TiDocumentText } from 'react-icons/ti'

import routes from '@/configs/routes'
import Loading from '@/components/Common/Loading/Loading'
import NoContent from '@/components/shared/NoContent/NoContent'
import { Button } from '@/components/ui/button'
import { useCourseHistory } from '@/app/hooks/accounts/useRegisterTeacher'
import { RiQuestionFill } from 'react-icons/ri'

const CourseHistory = () => {
    const [limit, setLimit] = useState<number>(5)
    const navigate = useNavigate()
    const formatDate = (type: 'hour' | 'day', dateTime: string) => {
        const date = new Date(dateTime)
        if (type == 'day') {
            return `${date.toLocaleDateString()}`
        }
        if (type == 'hour') {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
            return `${hours}:${formattedMinutes}`
        }
    }

    const { data: courseHistory, isLoading } = useCourseHistory(limit)
    if (isLoading) return <Loading />

    return (
        <div className="card flex min-h-screen flex-col gap-4">
            <h2 className="text-lg font-semibold">Mốc thời gian</h2>
            <div className="flex flex-col gap-4">
                {courseHistory && courseHistory?.course?.length > 0 ? (
                    courseHistory?.course?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                navigate(`${routes.courseLeaning.replace(':slug', item.slug)}?id=${item.id}`)
                            }
                            className="flex cursor-pointer items-center justify-between gap-5 rounded-md bg-softGrey px-5 py-3 duration-200 hover:bg-softGrey/50"
                        >
                            <div className="flex items-center gap-5">
                                <span className="w-4">{index + 1}</span>
                                <span>{formatDate('hour', item.created_at)}</span>
                                {item.content_type == 'document' && <TiDocumentText className="size-6 text-primary" />}
                                {item.content_type == 'video' && <IoIosPlayCircle className="size-6 text-primary" />}
                                {!item.content_type && <RiQuestionFill className="size-6 text-primary" />}
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-base font-semibold">{item.title}</h2>
                                    {item.content_type == 'document' && <span>Tài liệu kết thúc</span>}
                                    {item.content_type == 'video' && <span>Video kết thúc</span>}
                                    {!item.content_type && <span>Câu hỏi kết thúc</span>}
                                </div>
                            </div>
                            <span>{formatDate('day', item.created_at)}</span>
                        </div>
                    ))
                ) : (
                    <NoContent />
                )}
            </div>
            {limit !== courseHistory?.total_lessons && courseHistory?.course && courseHistory?.course.length > 0 && (
                <Button variant="outline" onClick={() => setLimit(courseHistory?.total_lessons!)}>
                    Xem tất cả
                </Button>
            )}
        </div>
    )
}

export default CourseHistory
