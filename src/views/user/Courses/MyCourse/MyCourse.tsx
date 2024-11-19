import Loading from '@/components/Common/Loading/Loading'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import CourseMyBought from '@/components/shared/Course/CourseMyBought'
import { useCourseMyBought } from '@/app/hooks/accounts/useMyBought'

const MyCourses = () => {
    const { data: courseBought, isLoading } = useCourseMyBought()
    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            <div className="flex flex-wrap gap-10">
                {courseBought && courseBought.map((item, index) => <CourseMyBought data={item} key={index} />)}
            </div>
        </div>
    )
}

export default MyCourses
