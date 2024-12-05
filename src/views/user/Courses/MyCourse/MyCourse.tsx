import FilterBar from '@/components/shared/FilterBar/FilterBar'
import CourseMyBought from '@/components/shared/Course/CourseMyBought'
import { useCourseMyBought, useGetMyCourseBySearch } from '@/app/hooks/accounts/useMyBought'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVisiblePages } from '@/lib'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'

import Loading from '@/components/Common/Loading/Loading'
import { useDebounce } from '@/app/hooks/custom/useDebounce'


const MyCourses = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)
    const [arrange, setArrange] = useState(queryParams.get('arrange') || '')
    const [category, setCategory] = useState(queryParams.get('category') || '')
    const [level, setLevel] = useState(queryParams.get('level') || '')
    const [search, setSearch] = useState(queryParams.get('search') || '')

    const { data: courseBought, isLoading } = useCourseMyBought(category, level, arrange, page, 6)
    const debounceValue = useDebounce(search, 500)
    const { data: myCourseBySearch } = useGetMyCourseBySearch(debounceValue)
    const courseToShow = search ? myCourseBySearch?.data : courseBought?.data

    const handleFilterChange = (filters: { arrange?: string; category?: string; level?: string; search?: string }) => {
        if (filters.arrange !== undefined) setArrange(filters.arrange)
        if (filters.category !== undefined) setCategory(filters.category)
        if (filters.level !== undefined) setLevel(filters.level)
        if (filters.search !== undefined) setSearch(filters.search)
    }

    const title = search && myCourseBySearch?.data && myCourseBySearch?.data.length > 0 ? `Kết quả cho "${search}"` : null

    useEffect(() => {
        const queryParams = new URLSearchParams()
        if (page > 1) queryParams.set('page', page.toString())
        if (arrange) queryParams.set('arrange', arrange)
        if (category) queryParams.set('category', category.toString())
        if (level) queryParams.set('level', level)
        if (search) queryParams.set('search', search)
        if (queryParams.toString()) {
            navigate(`?${queryParams.toString()}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, arrange, category, level, search, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((courseBought?.total ?? 0) / (courseBought?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)
    if (isLoading) return <Loading />
    return (
        <div className="flex flex-col gap-7">
            <FilterBar onFilterChange={handleFilterChange} placeholder="Tìm kiếm khóa học và người hướng dẫn" lever />
            {search && myCourseBySearch?.data && myCourseBySearch?.data.length > 0 ?
                <p className='text-lg font-medium text-darkGrey'>{title}</p>
                : null
            }
            <div className="flex flex-wrap gap-10">
                {courseToShow && courseToShow.length > 0 ? (
                    courseToShow.map((item, index) => <CourseMyBought data={item} key={index} />)
                ) : search ? (
                    <div className="text-center text-lg font-medium text-gray-500">
                        Không có kết quả nào phù hợp với từ khóa "{search}"
                    </div>
                ) : (
                    <div className="flex w-full justify-center">
                        <div className="flex flex-col gap-2 text-center">
                            <img
                                src="https://gcdnb.pbrd.co/images/7xbVj5PXiOQY.png"
                                className="w-full max-w-[350px]"
                                alt=""
                            />
                            <h2 className="text-xl font-bold">Bạn chưa mua khóa học nào</h2>
                        </div>
                    </div>
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

export default MyCourses
