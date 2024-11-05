import { IModule } from '@/types/course/course.ts'
import CourseModule from '@/components/shared/CourseModule'

const Content = ({ modules }: { modules: IModule[] }) => {
    return (
        <div className="flex flex-col gap-3">
            {modules.map((item, index) => (
                <CourseModule key={index} module={item} />
            ))}
        </div>
    )
}

export default Content
