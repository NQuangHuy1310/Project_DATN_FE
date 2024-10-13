import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Teacher from '@/components/shared/Teacher'
import Loading from '@/components/Common/Loading/Loading'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import NoContent from '@/components/shared/NoContent/NoContent'
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
    const visiblePages = getVisiblePages(totalPages, page, 3)

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <NoContent />
    }

    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm người hướng dẫn" />
            <div className="flex flex-wrap gap-10">
                {data?.teachers &&
                    data.teachers.map((item, index) => (
                        <Teacher
                            user_id={item.user_id}
                            key={index}
                            user_name={item.user_name}
                            user_avatar={item.user_avatar}
                            average_rating={item.average_rating}
                            total_ratings={item.total_ratings}
                            total_courses={item.total_courses}
                        />
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

export default Instructor
