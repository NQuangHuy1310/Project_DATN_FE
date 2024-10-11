
import FilterBar from '@/components/shared/FilterBar/FilterBar'

import PostItem from './PostItem'
import Loading from '@/components/Common/Loading/Loading'
import { usePost } from '@/app/hooks/usePost'

const Posts = () => {
    const { data, isLoading } = usePost()
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-7">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Bài viết nổi bật</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" />
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {data &&
                    data.length > 0 &&
                    data.map((item, index: number) => (
                        <PostItem
                            key={index}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            thumbnail={item.thumbnail}
                            slug={item.slug}
                            tags={item.tags}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Posts
