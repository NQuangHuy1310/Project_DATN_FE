import { memo } from 'react'

const Curriculum = memo(() => {
    return (
        <div className="rounded-lg p-5">
            <h4 className="border-b-2 border-gray-300 pb-3 text-2xl font-semibold capitalize">
                Chương trình giảng dạy
            </h4>
        </div>
    )
})

export default Curriculum
