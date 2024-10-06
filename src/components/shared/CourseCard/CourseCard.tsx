import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'

const CourseCard = () => {
    return (
        <div className="flex max-w-[1200px] items-center gap-4 rounded-md border-[1px]">
            <div className="h-[120px] w-[120px] flex-shrink-0">
                <img
                    src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
            <Link to="" className="group relative flex flex-1 items-center gap-20">
                <div className="flex flex-shrink-0 flex-col gap-10">
                    <h4 className="text-xl font-semibold">Javascript cơ bản</h4>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">Bản nháp</p>
                        <p className="text-sm text-darkGrey">Công khai</p>
                    </div>
                </div>
                <div className="flex flex-1 items-center gap-5 max-lg:hidden">
                    <h5 className="text-base font-medium">Kết thúc khoá học của bạn</h5>
                    <div className="w-full max-w-[400px]">
                        <Progress value={40} className="bg-primary" />
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-lg font-medium text-primary">Chỉnh sửa/Quản lý khoá học</p>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard
