import React from 'react'

import noContent from '@/assets/no-content.jpg'

interface NoContentProps {
    description?: string
}

const NoContent: React.FC<NoContentProps> = ({ description = 'Không có dữ liệu' }) => {
    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col gap-2 text-center">
                <img src={noContent} className="w-full max-w-[350px]" alt="" />
                <h2 className="text-xl font-medium">{description}</h2>
            </div>
        </div>
    )
}

export default NoContent
