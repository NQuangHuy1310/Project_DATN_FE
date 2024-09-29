import Course from '@/components/shared/Course/Course'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { courses } from '@/constants/mockData'

const CourseSearch = () => {
    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="flex gap-10">
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
    )
}

export default CourseSearch
