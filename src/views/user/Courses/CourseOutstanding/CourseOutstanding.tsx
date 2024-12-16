import { useCourseSaleHome } from '@/app/hooks/courses/useCourse'
import Banners from '@/components/shared/Banner/Banners'
import Course from '@/components/shared/Course'
import routes from '@/configs/routes'

const CourseOutstanding = () => {
    const { data: course_sales } = useCourseSaleHome()

    return (
        <div>
            <Banners />
            <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-5 py-9 lg:px-0">
                <h2 className="text-2xl font-semibold">Danh sách khóa học</h2>
            </div>
            <div className="mx-auto flex max-w-[1200px] flex-wrap gap-8 px-5 lg:px-0 pb-10">
                {course_sales?.map((item, index) => (
                    <Course key={index} data={item} page={routes.courseDetailNoLogin} />
                ))}
            </div>
        </div>
    )
}

export default CourseOutstanding
