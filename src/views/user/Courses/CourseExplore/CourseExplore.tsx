import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { useGetAllCourses } from '@/app/hooks/courses/useCourse'
import Loading from '@/components/Common/Loading/Loading'
import Course from '@/components/shared/Course'
import routes from '@/configs/routes'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVisiblePages } from '@/lib'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const CoursesExplore = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)

    const { data: allCourses, isLoading } = useGetAllCourses(page, 6)

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (allCourses?.total || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((allCourses?.total ?? 0) / (allCourses?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-8">
            <FilterBar placeholder="Tìm kiếm khóa học" lever />
            <div className="flex flex-wrap gap-10">
                {allCourses?.data &&
                    allCourses?.data.length > 0 &&
                    allCourses?.data.map((item, index) => (
                        <Course data={item} key={index} page={routes.courseDetail} />
                    ))}
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
                                    className={
                                        page === totalPages ? 'border' : 'cursor-pointer border bg-darkGrey/90'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default CoursesExplore
