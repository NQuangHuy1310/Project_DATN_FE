import FilterBar from '@/components/shared/FilterBar/FilterBar'

import Post from '@/components/shared/Post'
import Loading from '@/components/Common/Loading/Loading'
import { useGetPosts, useGetPostsByCategory } from '@/app/hooks/posts'
import { useGetCategoriesPost } from '@/app/hooks/categories'
import { useEffect, useState } from 'react'
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

const Posts = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const initialPage = parseInt(queryParams.get('page') || '1', 10)
    const [page, setPage] = useState(initialPage)

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const { data: allPosts, isLoading } = useGetPosts(page, 6)
    const { data: categories } = useGetCategoriesPost()
    const { data: postByCategory } = useGetPostsByCategory(selectedCategory!)
    const postsToShow = selectedCategory ? postByCategory?.data : allPosts?.data
    const handleCategoryClick = (categorySlug: string) => {
        setSelectedCategory(categorySlug)
    }
    const pageTitle = selectedCategory
        ? `${categories?.find((category) => category.slug === selectedCategory)?.name || ''}`
        : 'Danh sách bài viết'

    useEffect(() => {
        if (page !== 1) {
            navigate(`?page=${page}`, { replace: true })
        } else {
            navigate(location.pathname, { replace: true })
        }
    }, [page, navigate, location.pathname])

    const handlePageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (allPosts?.total || 1)) {
            setPage(newPage)
        }
    }
    const totalPages = Math.ceil((allPosts?.total ?? 0) / (allPosts?.per_page ?? 0))
    const visiblePages = getVisiblePages(totalPages, page, 5)
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-10 px-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold"> {pageTitle}</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" isShowFilter={false} />
            </div>
            <div className="flex w-full gap-20">
                <div className="flex w-3/4 flex-col items-start gap-10">
                    {postsToShow && postsToShow.length > 0 && (
                        postsToShow.map((item, index) => <Post data={item} key={index} />)
                    )}
                </div>
                <div className="w-1/4">
                    <h3 className="text-lg font-medium text-darkGrey">XEM CÁC BÀI VIẾT THEO CHỦ ĐỀ</h3>
                    <div className="mt-8 flex flex-wrap gap-2">
                        <button
                            onClick={() => handleCategoryClick(null!)}
                            className={`rounded-full px-5 py-1.5 text-base ${selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
                        >
                            Tất cả
                        </button>
                        {categories?.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(category.slug)}
                                className={`rounded-3xl px-5 py-1.5 text-base ${selectedCategory === category.slug ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <div className="my-14 rounded-3xl">
                        <img src="https://s.net.vn/PVTz" alt="" className="my-10 rounded-3xl" />
                        <img src="https://s.net.vn/whBU" alt="" className="rounded-3xl" />
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

export default Posts
