import { IModule } from '@/types'

const CourseToday = ({ module }: { module: IModule[] }) => {
    return (
        <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{module.length} Chương</h3>
                <span className="text- text-darkGrey">0/5 hoàn thành</span>
            </div>
            <ul className="flex flex-col gap-3">
                {module.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="h-8 w-8 rounded-md border bg-darkGrey/20 text-center font-semibold leading-8">
                                {index + 1}
                            </span>
                            <h4 className="text-darkGrey">{item.title}</h4>
                        </div>
                        <span className="text-darkGrey">{item.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseToday
