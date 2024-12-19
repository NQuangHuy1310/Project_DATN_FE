import { Audience, Goal, Requirement } from '@/types/course/course'
import { FaCheckCircle } from 'react-icons/fa'

const About = ({
    goals,
    description,
    requirements,
    audiences
}: {
    goals: Goal[]
    description: string
    requirements: Requirement[]
    audiences: Audience[]
}) => {
    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold">Điểm nổi bật</h5>
                {goals.map((item, index) => (
                    <div className="flex gap-2.5" key={index}>
                        <FaCheckCircle className="size-4 text-primary" />
                        <p className="text-sm font-medium">{item.goal}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold">Yêu cầu</h5>
                {requirements.map((item, index) => (
                    <div className="flex gap-2.5" key={index}>
                        <FaCheckCircle className="size-4 text-primary" />
                        <p className="text-sm font-medium">{item.requirement}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold">Đối tượng tham gia</h5>
                {audiences.map((item, index) => (
                    <div className="flex gap-2.5" key={index}>
                        <FaCheckCircle className="size-4 text-primary" />
                        <p className="text-sm font-medium">{item.audience}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
                <h5 className="text-xl font-semibold">Mô tả khoá học</h5>
                <div className="flex flex-col gap-6">
                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </div>
        </div>
    )
}

export default About
