import { IoIosStar } from 'react-icons/io'
import { MdListAlt } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import Course from '@/components/shared/Course'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { useInstructorById } from '@/app/hooks/instructors/useInstructorClient'
import Loading from '@/components/Common/Loading/Loading'
import { getUrlParams } from '@/components/Common/GetUrlParam/getUrlParams'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const InstructorDetail = () => {
    const id = getUrlParams('id')
    const instructorId = id ? parseInt(id, 10) : NaN
    const { data, isLoading } = useInstructorById(instructorId)

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5">
            <div className="card flex flex-col-reverse gap-7 md:flex-col">
                <div className="flex w-full flex-col gap-7 md:flex-row md:justify-between md:gap-3">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14">
                            <Avatar className="size-11 md:size-14">
                                <AvatarImage src={data?.dataTeacher.user_avatar} alt={data?.dataTeacher.user_avatar} />
                                <AvatarFallback className="flex items-center justify-center bg-slate-500/50 font-semibold">
                                    {data?.dataTeacher.user_name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex-col">
                            <h3 className="text-xl font-semibold">{data?.dataTeacher.user_name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdListAlt className="size-5" />
                        <span>{data?.dataTeacher.total_courses} khóa học</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoIosStar className="size-5 text-primary" />
                        <span>
                            {data?.dataTeacher.average_rating} ({data?.dataTeacher.total_ratings} đánh giá)
                        </span>
                    </div>

                    <div className="flex items-center justify-center rounded-lg bg-secondaryYellow md:justify-start md:rounded-none md:bg-white">
                        <Button variant="ghost" className="w-full py-3 md:text-primary">
                            + Theo dõi
                        </Button>
                    </div>
                </div>
                <FilterBar placeholder="Tìm kiếm người hướng dẫn" lever />
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
                {data?.dataCourses &&
                    data?.dataCourses.length > 0 &&
                    data?.dataCourses.map((item, index) => (
                        <Course
                            key={index}
                            course_id={item.course_id}
                            course_name={item.course_name}
                            course_thumbnail={item.course_thumbnail}
                            createdBy={item.createdBy}
                            level={item.level}
                            average_rating={item.average_rating}
                            totalTime={item.totalTime}
                            total_student={item.total_student}
                            totalVideo={item.totalVideo}
                        />
                    ))}
            </div>
        </div>
    )
}

export default InstructorDetail
