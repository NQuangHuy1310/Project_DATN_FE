import { myCourses } from '@/constants/mockData'
import MyCourse from '@/components/shared/Course/MyCourse'
import FilterBar from '@/components/shared/FilterBar/FilterBar'


const MyCourses = () => {
    return (
        <div>
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="mt-7 flex flex-wrap  gap-10">
                {myCourses && myCourses.length > 0 && myCourses.map((item, index) => (
                    <MyCourse
                        key={index}
                        name={item.name}
                        image={item.image}
                        createdBy={item.createdBy}
                        level={item.level}
                        star={item.star}
                        totalLesson={item.totalLesson}
                        progressLesson={item.progressLesson}
                    />
                ))}
            </div>
        </div>
    )
}

export default MyCourses