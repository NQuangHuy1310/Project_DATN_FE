import FilterBar from '@/components/shared/FilterBar/FilterBar'
import Teacher from '@/components/shared/Teacher'
import { mockTeachers } from '@/constants/mockData'

const Mentor = () => {
    return (
        <div>
            <FilterBar placeholder="Tìm kiếm người hướng dẫn" />
            <div className="mt-7 flex gap-10">
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

export default Mentor
