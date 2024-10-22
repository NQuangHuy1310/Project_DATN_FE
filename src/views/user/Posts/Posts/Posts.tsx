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
        <div className="flex flex-col gap-7 rounded-md bg-white p-7">
            <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Bài viết nổi bật</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" isShowFilter={false} />
            </div>
            <div className="">
                {data ? (
                    data.map((item, index) => (
                        <Post
                            key={index}
                            avatar={item.avatar}
                            image={item.thumbnail}
                            category={item.categories[0].name}
                            userName={item.username}
                            title={item.title}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <img src={noContent} alt="" />
                        <p className="text-base font-medium text-muted-foreground">Chưa có bài biết nào</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Posts
