import { useGetWishList } from '@/app/hooks/courses/useCourse'
import Loading from '@/components/Common/Loading/Loading'
import Course from '@/components/shared/Course'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import NoContent from '@/components/shared/NoContent/NoContent'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { getVisiblePages } from '@/lib'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const CourseWishList = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)

    const { data: wishList, isLoading } = useGetWishList(page, 6)
    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (wishList?.total || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((wishList?.total ?? 0) / (wishList?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)
    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-7">
            <FilterBar placeholder="Tìm kiếm khóa học" lever />
            {wishList?.data && wishList.data.length > 0 ?
                <div className='flex flex-wrap gap-10'>
                    {wishList?.data?.map((course, index) => <Course data={course} key={index} />)}
                </div> : <NoContent />}
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

export default CourseWishList
