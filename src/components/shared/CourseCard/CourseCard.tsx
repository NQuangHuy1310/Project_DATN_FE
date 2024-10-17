import { Progress } from '@/components/ui/progress'
import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { Link } from 'react-router-dom'

const CourseCard = ({ name, id, status, thumbnail }: ICourseItem) => {
    const thumbnailImage = getImagesUrl(thumbnail ?? '')
    const courseLink = routes.createCourse.replace(':id', id.toString())

    return (
        <div className="flex max-w-[1200px] items-center gap-4 overflow-hidden rounded-md border-[1px]">
            <div className="h-[120px] w-[120px] flex-shrink-0">
                <img
                    src={thumbnail ? thumbnailImage : 'https://s.udemycdn.com/course/200_H/placeholder.jpg'}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>
            <Link to={courseLink} className="group relative flex h-[120px] w-full flex-1 items-center gap-20">
                <div className="flex flex-shrink-0 flex-col gap-10">
                    <h4 className="text-xl font-semibold">{name}</h4>
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">
                            {status === 'draft' && 'Bản nháp'}
                            {status === 'approved' && 'Thành công'}
                            {status === 'pending' && 'Chờ xác nhận'}
                            {status === 'rejected' && 'Bị từ chối'}
                        </p>
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
