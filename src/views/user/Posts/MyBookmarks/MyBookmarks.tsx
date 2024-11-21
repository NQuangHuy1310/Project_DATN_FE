import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getVisiblePages } from '@/lib'
import { useGetPostsSaved } from '@/app/hooks/posts'

import Post from '@/components/shared/Post'
import Loading from '@/components/Common/Loading/Loading'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import NoContent from '@/components/shared/NoContent/NoContent'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const MyBookmarks = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)
    const { data, isLoading } = useGetPostsSaved(page, 5)
    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (data?.total || 1)) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((data?.total ?? 0) / (data?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)

    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-10 ">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold"> Bài viết đã lưu</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" isShowFilter={false} />
            </div>
            <div className="flex w-full gap-20">
                <div className="flex w-3/4 flex-col items-start gap-10">
                    {data && data.data && data.data.length > 0 ? (
                        data.data.map((item, index) => <Post data={item} key={index} />)
                    ) : <NoContent />}
                </div>
                <div className="w-1/4 ">
                    <div className="flex flex-col gap-10 rounded-3xl">
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/banners/25/63dc61d4caec2.png"
                            alt=""
                            className="rounded-3xl"
                        />
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/banners/32/6421144f7b504.png"
                            alt=""
                            className="rounded-3xl"
                        />
                    </div>
                </div>
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

export default MyBookmarks
