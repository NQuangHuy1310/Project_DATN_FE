import { IoMdStar } from 'react-icons/io'

import { Button } from '@/components/ui/button'

const Reviews = () => {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex w-full max-w-[650px] flex-col gap-2.5">
                <h4 className="text-base font-medium">Jason Smith</h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <IoMdStar className="size-5 text-primary" />
                        <IoMdStar className="size-5 text-primary" />
                        <IoMdStar className="size-5 text-primary" />
                        <IoMdStar className="size-5 text-primary" />
                    </div>
                    <p>20 Feb 2024</p>
                </div>
                <p>This course definitely brings me more values than I expect. Thank you so much both of you guys!</p>
            </div>
            <div>
                <Button variant="outline" size="lg">
                    Hiện thêm đánh giá
                </Button>
            </div>
        </div>
    )
}

export default Reviews
