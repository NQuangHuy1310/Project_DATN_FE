import { format } from 'date-fns'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { getImagesUrl } from '@/lib'
import { ICourseItem } from '@/types/instructor'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const CourseCard = ({ name, id, status, thumbnail, submited_at: submittedAt, category }: ICourseItem) => {
    const navigate = useNavigate()
    const thumbnailImage = getImagesUrl(thumbnail ?? '')

    const redirectToCourse = (type: string) => {
        const courseRoute = routes.createCourse.replace(':id', id.toString()).concat(`?type=${type}`)
        navigate(courseRoute)
    }

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
            <div className="flex h-[120px] w-full flex-1 items-start justify-between gap-20">
                <div className="mt-2 flex flex-col items-center">
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
                                    {status === 'approved' && 'Đã phê duyệt'}
                                    {status === 'pending' && 'Chờ phê duyệt'}
                                    {status === 'rejected' && 'Từ chối phê duyệt'}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="mt-1 p-3">
                        <BsThreeDots className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={5}>
                        <DropdownMenuItem onClick={() => redirectToCourse(status)}>Chỉnh sửa khoá học</DropdownMenuItem>
                        <DropdownMenuItem>Xem trước khoá học</DropdownMenuItem>
                        <DropdownMenuItem>Ẩn khoá học</DropdownMenuItem>
                        <DropdownMenuItem>Xóa khoá học</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default CourseCard
