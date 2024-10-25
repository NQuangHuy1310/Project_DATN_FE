import { Goal, Requirement } from '@/types/course/course'
import { FaCheckCircle } from 'react-icons/fa'

const About = ({
    goals,
    description,
    requirements
}: {
    goals: Goal[]
    description: string
    requirements: Requirement[]
}) => {
    return (
        <div>
            <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-5">
                    <h5 className="text-xl font-medium">Yêu cầu</h5>
                    {requirements.map((item, index) => (
                        <div className="flex gap-2.5" key={index}>
                            <FaCheckCircle className="size-4 text-red-500" />
                            <p>{item.requirement}</p>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-5">
                    <h5 className="text-xl font-medium">Điểm nổi bật</h5>
                    {goals.map((item, index) => (
                        <div className="flex gap-2.5" key={index}>
                            <FaCheckCircle className="size-4 text-primary" />
                            <p>{item.goal}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-3">
                    <h5 className="text-xl font-medium">Mô tả khoá học</h5>
                    <div className="flex flex-col gap-6">
                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
