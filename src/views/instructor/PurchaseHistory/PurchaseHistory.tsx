import { useEffect, useState } from 'react'

import { ICourseApproved } from '@/types/instructor'
import { useGetCoursesApproved, useHistoryBuyCourse } from '@/app/hooks/instructors'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { TbCoinFilled } from 'react-icons/tb'
import Loading from '@/components/Common/Loading/Loading'
import NoContent from '@/components/shared/NoContent/NoContent'
import { getImagesUrl, getVisiblePages } from '@/lib'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const PurchaseHistory = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)
    const [dateEnd, setDateEnd] = useState<string>('')
    const [courseId, setCourseId] = useState<number | undefined>(undefined)
    const [dateStart, setDateStart] = useState<string>('')
    const [tempDateEnd, setTempDateEnd] = useState<string>('')
    const [tempDateStart, setTempDateStart] = useState<string>('')

    const { data: courseData } = useGetCoursesApproved()
    const { data: historyBuyCourseData, isLoading } = useHistoryBuyCourse(6, page, 6, dateStart, dateEnd)

    const handleSelectCourse = (value: string) => {
        if (value === 'all') {
            setCourseId(undefined)
        } else {
            setCourseId(+value)
        }
    }

    const handleDateChangeStart = (value: any) => {
        const date = new Date(value)
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        setTempDateStart(formattedDate)
    }

    const handleDateChangeEnd = (value: any) => {
        const date = new Date(value)
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        setTempDateEnd(formattedDate)
    }

    const handleSearch = () => {
        const now = new Date()
        const formattedNow = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`

        const validDateStart = tempDateStart && !isNaN(new Date(tempDateStart).getTime()) ? tempDateStart : null
        const validDateEnd = tempDateEnd && !isNaN(new Date(tempDateEnd).getTime()) ? tempDateEnd : null

        if (!validDateStart && !validDateEnd) {
            toast.error('Vui lòng nhập thời gian bắt đầu.')
            return
        }

        if (validDateStart && new Date(validDateStart) > now) {
            toast.error('Ngày bắt đầu không được lớn hơn ngày hiện tại.')
            return
        }

        if (validDateStart && validDateEnd && new Date(validDateStart) > new Date(validDateEnd)) {
            toast.error('Ngày bắt đầu không được lớn hơn ngày kết thúc.')
            return
        }

        // Nếu như không nhập thì mặc định sẽ là ngày hôm nay
        const finalDateStart = validDateStart || formattedNow
        const finalDateEnd = validDateEnd || formattedNow

        setDateStart(finalDateStart)
        setDateEnd(finalDateEnd)
        setPage(1)
    }

    const formatDate = (dateTime: string) => {
        const date = new Date(dateTime)
        return `${date.toLocaleDateString()}`
    }

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (historyBuyCourseData?.total || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((historyBuyCourseData?.total ?? 0) / (historyBuyCourseData?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    if (isLoading) return <Loading />

    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex h-[72px] items-end gap-6">
                    <div className="flex h-full flex-col gap-1">
                        <h6 className="text-sm text-muted-foreground">Lựa chọn khoá học</h6>
                        <Select
                            onValueChange={handleSelectCourse}
                            value={courseId === undefined ? 'all' : courseId.toString()}
                        >
                            <SelectTrigger className="flex w-[300px] items-center justify-between">
                                <SelectValue placeholder="Chọn khoá học" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Chọn khoá học</SelectLabel>
                                    <SelectItem value="all">Tất cả khoá học</SelectItem>
                                    {courseData &&
                                        courseData.map((course: ICourseApproved) => (
                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex h-full flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Chọn thời gian bắt đầu</span>
                        <DatePicker onDateChange={handleDateChangeStart} placeholderText="Ngày bắt đầu" />
                    </div>

                    <div className="flex h-full flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Chọn thời gian kết thúc</span>
                        <DatePicker onDateChange={handleDateChangeEnd} placeholderText="Ngày kết thúc" />
                    </div>

                    <div className="flex h-full items-end">
                        <Button onClick={handleSearch} size="lg">
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                {historyBuyCourseData && historyBuyCourseData.data && historyBuyCourseData.data.length > 0 ? (
                    <table className="w-full text-left text-sm text-black rtl:text-right">
                        <thead className="bg-gray-50 text-xs uppercase text-darkGrey">
                            <tr>
                                <th scope="col" className="p-4">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên học viên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên khóa học
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ảnh khóa học
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Giá khóa học
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Ngày mua
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyBuyCourseData.data.map((item, index) => (
                                <tr key={index} className="border-b bg-white hover:bg-gray-50">
                                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{item.student_name}</td>
                                    <td className="px-6 py-4">{item.course_name}</td>
                                    <td className="px-6 py-4">
                                        {' '}
                                        <img
                                            className="w-full max-w-52 rounded-md"
                                            src={getImagesUrl(item.thumbnail)}
                                            alt=""
                                        />{' '}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <TbCoinFilled className="size-5 text-secondaryYellow" />
                                            {parseFloat(item.price.toString())}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">{formatDate(item.created_at)}</td>
                                    <td className="px-6 py-4">
                                        <span className="me-2 whitespace-nowrap rounded-full bg-primary px-2.5 py-1.5 text-xs font-medium text-white">
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NoContent description="Chưa có học viên mua khóa học" />
                )}
            </div>
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(page - 1)}
                                    className={page === 1 ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                                />
                            </PaginationItem>

                            {visiblePages[0] > 1 && (
                                <PaginationItem>
                                    <span className="px-2">...</span>
                                </PaginationItem>
                            )}

                            {visiblePages.map((pageNumber: number) => (
                                <PaginationItem key={pageNumber} className="cursor-pointer">
                                    <PaginationLink
                                        isActive={page === pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {visiblePages[visiblePages.length - 1] < totalPages && (
                                <PaginationItem>
                                    <span className="px-2">...</span>
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(page + 1)}
                                    className={page === totalPages ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default PurchaseHistory
