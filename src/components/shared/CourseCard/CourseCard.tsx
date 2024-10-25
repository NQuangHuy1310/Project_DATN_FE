import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const CourseCard = ({ name, id, status, thumbnail, submited_at: submittedAt, category }: ICourseItem) => {
    const thumbnailImage = getImagesUrl(thumbnail ?? '')
    const courseLink = routes.createCourse.replace(':id', id.toString())

    const formatDate = submittedAt ? format(new Date(submittedAt), 'dd/MM/yyyy') : 'Chưa đăng ký'

    return (
        <div className="flex max-w-[1200px] items-center gap-4 overflow-hidden rounded-md border-[1px]">
            <div className="h-[120px] w-[120px] flex-shrink-0">
                <img
                    src={thumbnail ? thumbnailImage : 'https://s.udemycdn.com/course/200_H/placeholder.jpg'}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </div>
            <Link to={courseLink} className="relative flex h-[120px] w-full flex-1 items-center gap-20">
                <div className="flex w-[300px] flex-shrink-0 flex-col gap-1">
                    <h4 className="text-xl font-semibold">{name}</h4>
                    <div className="flex flex-col items-start gap-1">
                        <p className="text-sm">
                            Danh mục: <strong>{category.name}</strong>
                        </p>
                        <p className="text-sm">
                            Ngày đăng ký: <strong>{formatDate}</strong>
                        </p>
                        <p className="text-sm">
                            Trạng thái:{' '}
                            <strong>
                                {status === 'draft' && 'Bản nháp'}
                                {status === 'approved' && 'Đã xác nhận'}
                                {status === 'pending' && 'Chờ xác nhận'}
                                {status === 'rejected' && 'Bị từ chối'}
                            </strong>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard
