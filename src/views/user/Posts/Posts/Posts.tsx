import FilterBar from '@/components/shared/FilterBar/FilterBar'

import noContent from '@/assets/no-content.jpg'

import Post from '@/components/shared/Post'
import Loading from '@/components/Common/Loading/Loading'
import { useGetPosts, useGetPostsByCategory } from '@/app/hooks/posts'
import { useGetCategoriesPost } from '@/app/hooks/categories'
import { useState } from 'react'

const Posts = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const { data: allPosts, isLoading } = useGetPosts()
    const { data: categories } = useGetCategoriesPost()
    const { data: postByCategory } = useGetPostsByCategory(selectedCategory!)

    const postsToShow = selectedCategory ? postByCategory?.data : allPosts?.data

    const handleCategoryClick = (categorySlug: string) => {
        setSelectedCategory(categorySlug)
    }
    const pageTitle = selectedCategory
        ? `${categories?.find((category) => category.slug === selectedCategory)?.name || ''
        }`
        : 'Danh sách bài viết'

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
                    {postsToShow && postsToShow.length > 0 ? (
                        postsToShow.map((item, index) => <Post data={item} key={index} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <img src={noContent} alt="No content" />
                            <span className="text-base font-medium text-muted-foreground">Chưa có bài viết nào</span>
                        </div>
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
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/banners/25/63dc61d4caec2.png"
                            alt=""
                            className="my-10 rounded-3xl"
                        />
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/banners/32/6421144f7b504.png"
                            alt=""
                            className="rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts
