import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { mockTeachers } from '@/constants/mockData'

const CoursesExplore = () => {
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
                    {/* {courses &&
                        courses.length > 0 &&
                        courses.map((item, index) => (
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
                        ))} */}
                </div>
            </div>
        </div>
    )
}

export default CoursesExplore
