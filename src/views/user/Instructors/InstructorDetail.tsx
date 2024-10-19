import { Suspense, lazy } from 'react'
import { IoIosStar } from 'react-icons/io'
import { MdListAlt } from 'react-icons/md'

import { useGetIdParams } from '@/app/hooks/common/useCustomParams'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInstructorById } from '@/app/hooks/instructors/useInstructorClient'

// Lazy load các component
const Course = lazy(() => import('@/components/shared/Course'))
const Loading = lazy(() => import('@/components/Common/Loading/Loading'))
const FilterBar = lazy(() => import('@/components/shared/FilterBar/FilterBar'))
const NoContent = lazy(() => import('@/components/shared/NoContent/NoContent'))

const InstructorDetail = () => {
    const instructorId = useGetIdParams('id')
    const { data, isLoading } = useInstructorById(instructorId!)

    if (isLoading) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Loading />
            </Suspense>
        )
    }

    if (!data) {
        return (
            <Suspense fallback={<div>Loading No Content...</div>}>
                <NoContent />
            </Suspense>
        )
    }

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

                <Suspense fallback={<div>Loading Filter Bar...</div>}>
                    <FilterBar placeholder="Tìm kiếm người hướng dẫn" lever />
                </Suspense>
            </div>

            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
                <Suspense fallback={<div>Loading Courses...</div>}>
                    {data?.dataCourses ? (
                        data.dataCourses.map((item, index) => (
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
                        ))
                    ) : (
                        <Suspense fallback={<div>Loading No Content...</div>}>
                            <NoContent />
                        </Suspense>
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default InstructorDetail
