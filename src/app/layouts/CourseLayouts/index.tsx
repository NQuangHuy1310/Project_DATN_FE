import { ReactNode } from 'react'

const CourseLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default CourseLayout
