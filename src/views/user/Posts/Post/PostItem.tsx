import { Link } from 'react-router-dom'
import { MouseEvent, useState } from 'react'

import { IPosts } from '@/types/blogs'
import { IoBookmark } from 'react-icons/io5'

const PostItem = ({ title, description, slug, thumbnail, author, tags, read_time }: IPosts) => {
    const [isBookmarked, setIsBookmarked] = useState(false)

    const handleBookmarkClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsBookmarked(!isBookmarked)
    }

    return (
        <Link to={slug}>
            <div className="flex h-full flex-col gap-1 rounded-lg bg-white p-4 shadow-md">
                <div className="relative">
                    <img src={thumbnail} alt="Image 1" className="h-44 w-full rounded-lg object-cover" />
                    <div className="absolute right-2 top-2 rounded-full bg-white p-1 text-2xl" onClick={handleBookmarkClick}>
                        <IoBookmark className={`size-7 ${isBookmarked ? 'text-red-600' : 'text-darkGrey'}`} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-darkGrey">{author.name}</span>
                    <span className="text-sm text-darkGrey">{read_time}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="line-clamp-1 text-darkGrey">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span className="inline-block rounded-full bg-grey px-3 py-1 text-sm font-semibold text-darkGrey">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default PostItem
