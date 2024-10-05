import { FaFigma } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

import { Button } from '@/components/ui/button'

const Tools = () => {
    return (
        <div className="flex flex-wrap items-center gap-5">
            <div className="flex w-full items-center justify-between rounded-lg border-[1px] border-softGrey bg-white p-7 md:max-w-[340px]">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-softGrey">
                        <FaFigma className="size-5 text-primary" />
                    </div>
                    <div className="">
                        <h5 className="font-bold">Figma</h5>
                        <p className="text-darkGrey">Miễn phí</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Tải xuống
                </Button>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg border-[1px] border-softGrey bg-white p-7 md:max-w-[340px]">
                <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-full bg-softGrey">
                        <VscVscode className="size-5 text-primary" />
                    </div>
                    <div className="">
                        <h5 className="font-bold">VS Code </h5>
                        <p className="text-darkGrey">Miễn phí</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Tải xuống
                </Button>
            </div>
        </div>
    )
}

export default Tools
