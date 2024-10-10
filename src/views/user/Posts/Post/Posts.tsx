import BlogItem from './PostItem'
import { ItemPost } from '@/constants/mockData'
import FilterBar from '@/components/shared/FilterBar/FilterBar'

const Posts = () => {
    return (
        <div className="flex flex-col gap-7 rounded-md bg-white p-7">
            <div className="flex flex-col gap-5">
                <h1 className="text-3xl font-bold">Bài viết nổi bật</h1>
                <FilterBar placeholder="Tìm kiếm bài viết" />
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {ItemPost &&
                    ItemPost.length > 0 &&
                    ItemPost.map((item, index) => (
                        <BlogItem
                            key={index}
                            title={item.title}
                            description={item.description}
                            thumbnail={item.thumbnail}
                            slug={item.slug}
                            author={item.author}
                            tags={item.tags}
                            read_time={item.read_time}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Posts
