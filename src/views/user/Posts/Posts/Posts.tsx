import FilterBar from '@/components/shared/FilterBar/FilterBar'

import noContent from '@/assets/no-content.jpg'

import Post from '@/components/shared/Post'
import Loading from '@/components/Common/Loading/Loading'
import { useGetPosts } from '@/app/hooks/posts'

const Posts = () => {
    const { data, isLoading } = useGetPosts()

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-10 px-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Bài viết nổi bật</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" isShowFilter={false} />
            </div>
            <div className="flex w-full gap-20">
                <div className="flex w-3/4 flex-wrap items-start gap-10">
                    {data?.data && data?.data.length > 0 ? (
                        data?.data.map((item, index) => <Post data={item} key={index} />)
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <img src={noContent} alt="No content" />
                            <p className="text-base font-medium text-muted-foreground">Chưa có bài viết nào</p>
                        </div>
                    )}
                </div>
                <div className="w-1/4">
                    <h3 className="text-xl font-medium text-darkGrey">XEM CÁC BÀI VIẾT THEO CHỦ ĐỀ</h3>
                    <div className="mt-8">
                        <button className="rounded-3xl bg-gray-200 px-5 py-2 text-xl text-black">Lập trình web</button>
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
