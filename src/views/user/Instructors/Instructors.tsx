import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { mockTeachers } from '@/constants/mockData'

const Instructor = () => {
    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm người hướng dẫn" />
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
                            status={item.status}
                            totalCourse={item.totalCourse}
                            totalReview={item.totalReview}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Instructor
