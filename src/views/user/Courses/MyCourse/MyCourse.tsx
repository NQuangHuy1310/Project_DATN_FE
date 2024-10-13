import { myCourses } from '@/constants/mockData'
import Course from '@/components/shared/Course/Course'
import FilterBar from '@/components/shared/FilterBar/FilterBar'

const MyCourses = () => {
    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="flex flex-wrap gap-10">
                {myCourses &&
                    myCourses.length > 0 &&
                    myCourses.map((item, index) => (
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

export default MyCourses
