import { FaRegCalendarCheck } from 'react-icons/fa'

import { calculateTimeAgo } from '@/lib'
import { Button } from '@/components/ui/button'
import { IQuizDetail } from '@/types/course/course'
import { useDetailQuizBySlug } from '@/app/hooks/courses/useCourse'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

const Assignment = () => {
    const slug = useGetSlugParams('slug')
    const { data: quizData } = useDetailQuizBySlug(slug!)

    return (
        <div className="flex flex-col gap-7">
            {quizData?.map((item: IQuizDetail, index: number) => {
                return (
                    <div className="flex w-full flex-col gap-5" key={index}>
                        <h6 className="text-base font-medium text-black md:text-lg">
                            {index + 1}. {item.title}
                        </h6>
                        <p className="text-xs md:text-sm">{item.description}</p>
                        <div className="flex flex-wrap items-center justify-between gap-y-5">
                            <div className="flex items-center gap-5">
                                <div className="flex cursor-pointer items-center gap-6">
                                    <FaRegCalendarCheck className="size-5 text-black" />
                                    <p className="font-medium">Hạn làm bài</p>
                                </div>
                                <Button>Xem chi tiết</Button>
                            </div>
                            <div className="flex items-center gap-5">
                                <p>40 Người đã hoàn thành</p>
                                <div className="h-5 w-[1px] bg-grey" />
                                <p className="text-secondaryRed">{calculateTimeAgo(item.created_at)}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Assignment
