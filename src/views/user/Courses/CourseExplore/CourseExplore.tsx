import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { mockTeachers } from '@/constants/mockData'
import { useCoursePopulate } from '@/app/hooks/courses/useCourse'
import Loading from '@/components/Common/Loading/Loading'
import Course from '@/components/shared/Course'
import routes from '@/configs/routes'

const CoursesExplore = () => {
    const { data: coursePopulate, isLoading } = useCoursePopulate()
    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-8">
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-black">Người hướng dẫn nổi bật</h2>
                <div className="flex flex-wrap gap-10">
                    {mockTeachers &&
                        mockTeachers.length > 0 &&
                        mockTeachers.map((item, index) => (
                            <Teacher
                                key={index}
                                user_id={item.user_id}
                                user_name={item.user_name}
                                user_avatar={item.user_avatar}
                                average_rating={item.average_rating}
                                total_ratings={item.total_ratings}
                                total_courses={item.total_courses}
                            />
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-black">Khoá học hàng tháng nổi bật</h2>
                <div className="flex flex-wrap gap-10">
                    {coursePopulate &&
                        coursePopulate.length > 0 &&
                        coursePopulate.map((item, index) => (
                            <Course data={item} key={index} page={routes.courseDetail} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CoursesExplore
