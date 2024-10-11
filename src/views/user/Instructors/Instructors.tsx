import Teacher from '@/components/shared/Teacher'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import Loading from '@/components/Common/Loading/Loading'
import { useInstructor } from '@/app/hooks/instructors/useInstructorClient'

const Instructor = () => {
    const { data, isLoading } = useInstructor()

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm người hướng dẫn" />
            <div className="flex flex-wrap gap-10">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                        <Teacher
                            key={index}
                            user_name={item.user_name}
                            user_avatar={item.user_avatar}
                            average_rating={item.average_rating}
                            total_ratings={item.total_ratings}
                            total_courses={item.total_courses}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Instructor
