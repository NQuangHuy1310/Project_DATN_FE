import { FaRegCalendarCheck } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

const Assignment = () => {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex w-full max-w-[690px] flex-col gap-5">
                <h6 className="text-lg font-medium text-black">1.Make a simple animation from figma prototype</h6>
                <p className="text-sm">
                    Let’s return to design thinking. Over time designers have built up their own body of approaches to
                    solving classes of problems.
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex cursor-pointer items-center gap-6">
                            <FaRegCalendarCheck className="size-5 text-black" />
                            <p className="font-medium">Hạn làm bài</p>
                        </div>
                        <Button>Xem chi tiết</Button>
                    </div>
                    <div className="flex items-center gap-5">
                        <p>40 Students Collected</p>
                        <div className="h-5 w-[1px] bg-grey" />
                        <p className="text-secondaryRed">1 Days Left</p>
                    </div>
                </div>
            </div>
            <div className="flex w-full max-w-[690px] flex-col gap-5">
                <h6 className="text-lg font-medium text-black">1.Make a simple animation from figma prototype</h6>
                <p className="text-sm">
                    Let’s return to design thinking. Over time designers have built up their own body of approaches to
                    solving classes of problems.
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="flex cursor-pointer items-center gap-6">
                            <FaRegCalendarCheck className="size-5 text-black" />
                            <p className="font-medium">Hạn làm bài</p>
                        </div>
                        <Button>Xem chi tiết</Button>
                    </div>
                    <div className="flex items-center gap-5">
                        <p>40 Students Collected</p>
                        <div className="h-5 w-[1px] bg-grey" />
                        <p className="text-secondaryRed">1 Days Left</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assignment
