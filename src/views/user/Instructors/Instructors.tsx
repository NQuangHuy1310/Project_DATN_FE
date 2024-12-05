import { useState, useEffect } from 'react'
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

import { useGetInstructorBySearch, useInstructor } from '@/app/hooks/instructors/useInstructorClient'
import { useDebounce } from '@/app/hooks/custom/useDebounce'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import Teacher from '@/components/shared/Teacher'
import Loading from '@/components/Common/Loading/Loading'

const Instructor = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)
    const [search, setSearch] = useState(queryParams.get('search') || '')

    const { data, isLoading } = useInstructor(page)
    const debounceValue = useDebounce(search, 500)

    const { data: intructorBySearch } = useGetInstructorBySearch(debounceValue)
    const intructorToShow = search ? intructorBySearch?.data : data?.data

    const title = search && intructorBySearch?.data && intructorBySearch?.data.length > 0 ? `Kết quả cho "${search}"` : null

    const handleFilterChange = (filters: { search?: string }) => {
        if (filters.search !== undefined) setSearch(filters.search)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (data?.total_pages || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = data?.total_pages || 1
    const visiblePages = getVisiblePages(totalPages, page, 5)

    useEffect(() => {
        const queryParams = new URLSearchParams()
        if (search) queryParams.set('search', search)
        if (queryParams.toString()) {
            navigate(`?${queryParams.toString()}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [search, page, navigate, location.pathname])

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5">
            <FilterBar onFilterChange={handleFilterChange} isShowFilter={false} placeholder="Tìm kiếm người hướng dẫn" />

            {search && intructorBySearch?.data && intructorBySearch?.data.length > 0 ?
                <p className='text-lg font-medium text-darkGrey'>{title}</p>
                : null}

            <div className="flex flex-wrap gap-5">
                {intructorToShow && intructorToShow.length > 0 ? (
                    intructorToShow.map((item, index) => <Teacher
                        key={index}
                        id={item.id}
                        name={item.name}
                        avatar={item.avatar}
                        ratings_avg_rate={item.ratings_avg_rate}
                        total_ratings={item.total_ratings}
                        total_courses={item.total_courses}
                    />)
                ) : (
                    search && (
                        <div className="text-center text-lg font-medium text-darkGrey">
                            Không có kết quả nào phù hợp với từ khóa "{search}"
                        </div>
                    )
                )}
            </div>
            {search.length == 0 && totalPages > 1 && (
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

export default Instructor
