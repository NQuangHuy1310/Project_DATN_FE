import { useGetFeaturedPosts } from '@/app/hooks/posts'
import Banners from '@/components/shared/Banner/Banners'
import Post from '@/components/shared/Post'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IoFilterSharp } from 'react-icons/io5'

const PostFeatured = () => {
    const { data: postFeatured } = useGetFeaturedPosts()

    return (
        <div>
            <Banners />
            <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-5 py-9 lg:px-0">
                <h2 className="text-xl font-medium">Danh sách bài viết</h2>
                <Select>
                    <SelectTrigger>
                        <IoFilterSharp className="size-4" />
                        <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="end">
                        <SelectGroup>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="a-z">Bài viết nổi bật</SelectItem>
                            <SelectItem value="z-a">Bài viết mới nhất</SelectItem>
                            <SelectItem value="z-a">Bài viết có lượt tương tác cao</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="container-main pb-10">
                <div className="flex flex-wrap gap-7">
                    {postFeatured?.map((post, index) => (
                        <Post
                            key={index}
                            image={post.thumbnail}
                            title={post.title}
                            avatar={post.avatar}
                            userName={post.name}
                            slug={post.slug}
                            views={post.views}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostFeatured
