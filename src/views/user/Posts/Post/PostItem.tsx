import { Link } from 'react-router-dom'

import { IPosts } from '@/types/posts'

const PostItem = ({ id, title, slug, thumbnail, tags }: IPosts) => {

    return (
        <Link key={id} to={slug}>
            <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
                <div className="relative">
                    <img src={thumbnail} alt="Image 1" className="h-44 w-full rounded-sm object-cover" />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <img src="https://camerabox.vn/uploads/thuat-ngu-nhiep-anh.jpg" className='rounded-full size-7' alt="" />
                            <span className='text-sm'>Lê Đình Dũng</span>
                        </div>
                        <span>5 phút đọc</span>
                    </div>
                    <h3 className="text-[17px] font-semibold">{title}</h3>
                </div>


                <div className="flex flex-shrink-0 mt-auto gap-2">
                    {tags?.map((tag) => (
                        <span className="inline-block rounded-full bg-grey px-3 py-1 text-sm font-semibold text-darkGrey">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default PostItem
