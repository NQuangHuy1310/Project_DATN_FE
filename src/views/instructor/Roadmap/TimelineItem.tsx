interface TimelineItemProps {
    date: string
    title: string
    description: string
}

const TimelineItem = ({ date, title, description }: TimelineItemProps) => {
    return (
        <ol className="relative border-l border-gray-200">
            <li className="mb-10 ms-4">
                <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                <time className="mb-1 text-sm text-gray-400">{date}</time>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mb-4 text-base text-gray-500">{description}</p>
            </li>
        </ol>
    )
}

export default TimelineItem
