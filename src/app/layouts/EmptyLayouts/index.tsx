import { ReactNode } from 'react'

const EmptyLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

export default EmptyLayout
