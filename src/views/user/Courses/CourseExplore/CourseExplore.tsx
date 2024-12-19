import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { getVisiblePages } from '@/lib'
import Course from '@/components/shared/Course'
import Loading from '@/components/Common/Loading/Loading'
import FilterBar from '@/components/shared/FilterBar/FilterBar'
import { useGetAllCourses, useGetCourseBySearch } from '@/app/hooks/courses/useCourse'
import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useDebounce } from '@/app/hooks/custom/useDebounce'

const CoursesExplore = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)
    const [arrange, setArrange] = useState(queryParams.get('arrange') || '')
    const [category, setCategory] = useState(queryParams.get('category') || '')
    const [level, setLevel] = useState(queryParams.get('level') || '')
    const [search, setSearch] = useState(queryParams.get('search') || '')

    const { data: allCourses, isLoading } = useGetAllCourses(category, level, arrange, page, 8)

    const debounceValue = useDebounce(search, 500)

    const { data: courseBySearch } = useGetCourseBySearch(debounceValue)

    const courseToShow = search ? courseBySearch?.data : allCourses?.data

    const handleFilterChange = (filters: { arrange?: string; category?: string; level?: string; search?: string }) => {
        if (filters.arrange !== undefined) setArrange(filters.arrange)
        if (filters.category !== undefined) setCategory(filters.category)
        if (filters.level !== undefined) setLevel(filters.level)
        if (filters.search !== undefined) setSearch(filters.search)
    }

    const title = search && courseBySearch?.data && courseBySearch?.data.length > 0 ? `Kết quả cho "${search}"` : null

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }

    const totalPages = Math.ceil((allCourses?.total ?? 0) / (allCourses?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)

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

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col gap-5">
            <FilterBar placeholder="Tìm kiếm khóa học" lever onFilterChange={handleFilterChange} />
            {search && courseBySearch?.data && courseBySearch?.data.length > 0 ?
                <p className='text-lg font-medium text-darkGrey'>{title}</p>
                : null}
            <div className="flex flex-wrap gap-5">
                {courseToShow && courseToShow.length > 0 ? (
                    courseToShow.map((item, index) => <Course data={item} key={index} page={routes.courseDetail} />)
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
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                                className={page === 1 ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                            />
                            {visiblePages[0] > 1 && <span className="px-2">...</span>}
                            {visiblePages.map((pageNumber) => (
                                <PaginationLink
                                    key={pageNumber}
                                    isActive={page === pageNumber}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            ))}
                            {visiblePages[visiblePages.length - 1] < totalPages && <span className="px-2">...</span>}
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                                className={page === totalPages ? 'border' : 'cursor-pointer border bg-darkGrey/90'}
                            />
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}

export default CoursesExplore
