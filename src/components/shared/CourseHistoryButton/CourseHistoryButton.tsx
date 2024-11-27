import { Link, useNavigate } from 'react-router-dom'

import { IoIosPlayCircle } from 'react-icons/io'
import { TiDocumentText } from 'react-icons/ti'

import routes from '@/configs/routes'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useCourseHistory } from '@/app/hooks/accounts/useRegisterTeacher'
import { RiQuestionFill } from 'react-icons/ri'

const CourseHistoryButton = () => {
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

    const { data: courseHistory } = useCourseHistory(5)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="text-sm font-bold">Lịch sử học tập</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[500px]">
                    <DropdownMenuLabel className="flex items-center justify-between">
                        <p className="text-lg">Lịch sử học tập</p>
                        <Link to={routes.courseHistory} className="text-sm font-normal">
                            Xem tất cả
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="scrollbar-hide flex max-h-[500px] flex-col gap-2 overflow-y-auto">
                        {courseHistory && courseHistory?.course?.length > 0 ? (
                            courseHistory?.course?.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (item.content_type == 'document' || item.content_type == 'video') {
                                            navigate(
                                                `${routes.courseLeaning.replace(':slug', item.slug)}?id=lesson-${item.id}`
                                            )
                                        } else {
                                            navigate(
                                                `${routes.courseLeaning.replace(':slug', item.slug)}?id=quiz-${item.id}`
                                            )
                                        }
                                    }}
                                    className="flex cursor-pointer items-center justify-between gap-5 rounded-md bg-softGrey px-5 py-3 duration-200 hover:bg-softGrey/50"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className="w-4">{index + 1}</span>
                                        <span>{formatDate('hour', item.created_at)}</span>
                                        {item.content_type == 'document' && (
                                            <TiDocumentText className="size-5 text-primary" />
                                        )}
                                        {item.content_type == 'video' && (
                                            <IoIosPlayCircle className="size-5 text-primary" />
                                        )}
                                        {!item.content_type && <RiQuestionFill className="size-5 text-primary" />}
                                        <div className="flex flex-col gap-1">
                                            <h2 className="max-w-[230px] text-base font-semibold">{item.title}</h2>
                                            {item.content_type == 'document' && <span>Tài liệu kết thúc</span>}
                                            {item.content_type == 'video' && <span>Video kết thúc</span>}
                                            {!item.content_type && <span>Câu hỏi kết thúc</span>}
                                        </div>
                                    </div>
                                    <span>{formatDate('day', item.created_at)}</span>
                                </div>
                            ))
                        ) : (
                            <span className="px-3 py-5 text-primary">Bạn chưa có lịch sử học tập</span>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CourseHistoryButton
