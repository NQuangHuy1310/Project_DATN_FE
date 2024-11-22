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
            {courseBought && courseBought.length > 0 ? (
                <div className="flex flex-wrap gap-10">
                    {courseBought && courseBought.length > 0 && courseBought.map((item, index) => <CourseMyBought data={item} key={index} />)}
                </div>
            ) : (
                <div className="flex w-full justify-center">
                    <div className="flex flex-col gap-2 text-center">
                        <img src="https://gcdnb.pbrd.co/images/7xbVj5PXiOQY.png" className="w-full max-w-[350px]" alt="" />
                        <h2 className="text-xl font-bold">Bạn chưa mua khóa học nào</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyCourses
