import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import { IRoadmap } from '@/types/teacher'
import RoadmapDetail from '@/components/shared/Roadmap/RoadmapDetail'
import { getImagesUrl } from '@/lib/common'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Roadmap = ({ data }: { data: IRoadmap }) => {
    const navigate = useNavigate()
    const [openRoadmap, setOpenRoadmap] = useState<boolean>(false)
    const radius = (64 - 8) / 2
    const circumference = 2 * Math.PI * radius

    return (
        <div className="card flex flex-col gap-2 rounded-xl border p-5 shadow-md">
            <div className="flex gap-8">
                <div className="flex max-w-[400px] flex-col gap-2">
                    <h3 className="text-xl font-bold">{data.name}</h3>
                    <p className="w-[300px] text-darkGrey">{data.description}</p>
                </div>
                <img
                    src={getImagesUrl(data.thumbnail)}
                    className="h-[100px] w-[100px] rounded-full border object-cover p-1 shadow-lg"
                    alt="Thumbnail"
                />
            </div>

            <div className="flex gap-2">
                {data.phases.map((phase) =>
                    phase.courses.map((item, index) => (
                        <div
                            className="relative flex items-center justify-center"
                            key={index}
                            style={{ width: 64, height: 64 }}
                        >
                            {item?.is_bought_course === true && (
                                <svg
                                    width={64}
                                    height={64}
                                    className="absolute left-0 top-0"
                                    style={{ transform: 'rotate(-90deg)' }}
                                >
                                    <circle
                                        cx={64 / 2}
                                        cy={64 / 2}
                                        r={radius}
                                        stroke="#DDDDDD"
                                        strokeWidth={4}
                                        fill="none"
                                    />
                                    <circle
                                        cx={64 / 2}
                                        cy={64 / 2}
                                        r={radius}
                                        stroke="#33CCFF"
                                        strokeWidth={4}
                                        fill="none"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference - (item.progress / 100) * circumference}
                                        strokeLinecap="round"
                                    />
                                </svg>
                            )}

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <img
                                            src={getImagesUrl(item.thumbnail)}
                                            alt={item.name}
                                            className="absolute h-11 w-11 cursor-pointer rounded-full"
                                            onClick={() => {
                                                if (item.is_bought_course === true) {
                                                    navigate(routes.courseLeaning.replace(':slug', item.slug))
                                                } else {
                                                    navigate(routes.courseDetail.replace(':slug', item.slug))
                                                }
                                            }}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {item.is_bought_course == true && <span>{item.progress}% -</span>}
                                        {item.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    ))
                )}
            </div>
            <Button className="w-fit" onClick={() => setOpenRoadmap(true)}>
                Xem chi tiết
            </Button>
            <RoadmapDetail data={data} open={openRoadmap} handleIsOpen={setOpenRoadmap} />
        </div>
    )
}

export default Roadmap
