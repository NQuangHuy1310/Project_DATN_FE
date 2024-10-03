import Course from '@/components/shared/Course/Course'
import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { courses, mockTeachers } from '@/constants/mockData'

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
                                name={item.name}
                                image={item.image}
                                job={item.job}
                                reviewStart={item.reviewStart}
                                totalCourse={item.totalCourse}
                                totalReview={item.totalCourse}
                                status={item.status}
                            />
                        ))}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-black">Khoá học hàng tháng nổi bật</h2>
                <div className="flex flex-wrap gap-10">
                    {courses &&
                        courses.length > 0 &&
                        courses.map((item, index) => (
                            <Course
                                key={index}
                                name={item.name}
                                image={item.image}
                                createdBy={item.createdBy}
                                level={item.level}
                                star={item.star}
                                totalTime={item.totalTime}
                                studentCount={item.studentCount}
                                totalVideo={item.totalVideo}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default CoursesExplore
