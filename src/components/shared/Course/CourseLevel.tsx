import { CourseLevel as level } from '@/constants'

export const CourseLevel = ({ courseLevel = level.Beginner }: { courseLevel: string }) => {
    return (
        <div className="flex h-8 items-center justify-center rounded-lg bg-white px-1.5 py-2">
            {courseLevel === level.Beginner && (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{courseLevel}</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="6.46155" width="3" height="5.53846" rx="1.5" fill="#25C78B" />
                        <rect x="5" y="3.69232" width="3" height="8.30769" rx="1.5" fill="#DFDFDF" />
                        <rect x="10" width="3" height="12" rx="1.5" fill="#DFDFDF" />
                    </svg>
                </div>
            )}
            {courseLevel === level.Intermediate && (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{courseLevel}</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="6.46155" width="3" height="5.53846" rx="1.5" fill="#FFBB54" />
                        <rect x="5" y="3.69232" width="3" height="8.30769" rx="1.5" fill="#FFBB54" />
                        <rect x="10" width="3" height="12" rx="1.5" fill="#DFDFDF" />
                    </svg>
                </div>
            )}
            {courseLevel === level.Master && (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{courseLevel}</span>
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="6.46155" width="3" height="5.53846" rx="1.5" fill="#DB5962" />
                        <rect x="5" y="3.69232" width="3" height="8.30769" rx="1.5" fill="#DB5962" />
                        <rect x="10" width="3" height="12" rx="1.5" fill="#DB5962" />
                    </svg>
                </div>
            )}
        </div>
    )
}
