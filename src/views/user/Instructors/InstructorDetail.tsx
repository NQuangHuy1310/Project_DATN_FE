import { Suspense, lazy } from 'react'
import { IoIosStar } from 'react-icons/io'
import { MdListAlt } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import { TeacherStatus } from '@/constants/constants'
import { useGetIdParams } from '@/app/hooks/common/useCustomParams'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useInstructorById } from '@/app/hooks/instructors/useInstructorClient'
import { useCheckFlowTeacher, useFlowTeacher, useUnFlowTeacher } from '@/app/hooks/accounts/useFlowTeacher'

// Lazy load các component
const Course = lazy(() => import('@/components/shared/Course'))
const Loading = lazy(() => import('@/components/Common/Loading/Loading'))
const FilterBar = lazy(() => import('@/components/shared/FilterBar/FilterBar'))
const NoContent = lazy(() => import('@/components/shared/NoContent/NoContent'))

const InstructorDetail = () => {
    const instructorId = useGetIdParams('id')
    const { data, isLoading } = useInstructorById(instructorId!)
    const { mutateAsync: flowTeacher } = useFlowTeacher()
    const { mutateAsync: unFlowTeacher } = useUnFlowTeacher()
    const { user } = useGetUserProfile()
    const { data: checkFollow } = useCheckFlowTeacher(user?.id!, data?.dataTeacher.id!)
    console.log(checkFollow)

    const handleFlowTeacher = async () => {
        if (data?.dataTeacher) {
            await flowTeacher([{ following_id: data?.dataTeacher.id! }])
        }
    }

    const handleUnFlowTeacher = async () => {
        if (data?.dataTeacher) {
            await unFlowTeacher([{ following_id: data?.dataTeacher.id! }])
        }
    }

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
                                <AvatarImage src={data?.dataTeacher.avatar} alt={data?.dataTeacher.avatar} />
                                <AvatarFallback className="flex items-center justify-center bg-slate-500/50 font-semibold">
                                    {data?.dataTeacher.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex-col">
                            <h3 className="text-xl font-semibold">{data?.dataTeacher.name}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdListAlt className="size-5" />
                        <span>{data?.dataTeacher.total_courses} khóa học</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoIosStar className="size-5 text-primary" />
                        <span>
                            {data?.dataTeacher.total_ratings} ({data?.dataTeacher.total_ratings} đánh giá)
                        </span>
                    </div>

                    <div className="flex items-center justify-center rounded-lg bg-secondaryYellow md:justify-start md:rounded-none md:bg-white">
                        {checkFollow && checkFollow?.action == 'follow' && (
                            <Button variant="default" className="w-full py-3" onClick={handleFlowTeacher}>
                                {TeacherStatus.follow}
                            </Button>
                        )}
                        {checkFollow && checkFollow?.action == 'unfollow' && (
                            <Button
                                variant="outline"
                                className="w-full py-3 duration-500 hover:bg-red-400 hover:text-white"
                                onClick={handleUnFlowTeacher}
                            >
                                {TeacherStatus.unFollow}
                            </Button>
                        )}
                    </div>
                </div>

                <Suspense fallback={<div>Loading Filter Bar...</div>}>
                    <FilterBar placeholder="Tìm kiếm người hướng dẫn" lever />
                </Suspense>
            </div>

            <div className="flex flex-wrap justify-center gap-5 md:justify-start">
                <Suspense fallback={<div>Loading Courses...</div>}>
                    {data?.dataCourses ? (
                        data.dataCourses.map((item, index) => <Course key={index} data={item} />)
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
