import { useState, useEffect, Suspense, lazy } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getVisiblePages } from '@/lib'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

import { useInstructor } from '@/app/hooks/instructors/useInstructorClient'

const Teacher = lazy(() => import('@/components/shared/Teacher'))
const Loading = lazy(() => import('@/components/Common/Loading/Loading'))
const FilterBar = lazy(() => import('@/components/shared/FilterBar/FilterBar'))
const NoContent = lazy(() => import('@/components/shared/NoContent/NoContent'))

const Instructor = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)

    const { data, isLoading } = useInstructor(page)

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (data?.total_pages || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = data?.total_pages || 1
    const visiblePages = getVisiblePages(totalPages, page, 5)

    if (isLoading) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Loading />
            </Suspense>
        )
    }

    return (
        <div className="flex flex-col gap-7">
            <Suspense fallback={<div>Loading Filter...</div>}>
                <FilterBar placeholder="Tìm kiếm người hướng dẫn" />
            </Suspense>

            {data ? (
                <>
                    <div className="flex flex-wrap gap-10">
                        <Suspense fallback={<div>Loading teachers</div>}>
                            {data?.teachers &&
                                data.teachers.map((item, index) => (
                                    <Teacher
                                        key={index}
                                        id={item.id}
                                        name={item.name}
                                        avatar={item.avatar}
                                        average_rating={item.average_rating}
                                        total_ratings={item.total_ratings}
                                        total_courses={item.total_courses}
                                    />
                                ))}
                        </Suspense>
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
                </>
            ) : (
                <Suspense fallback={<div>Loading dữ liệu...</div>}>
                    <NoContent />
                </Suspense>
            )}
        </div>
    )
}

export default Instructor
