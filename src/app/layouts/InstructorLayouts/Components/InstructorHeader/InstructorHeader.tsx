import { FaBars, FaRegBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import routes from '@/configs/routes'
import UserButton from '@/components/shared/UserButton'

function InstructorHeader({
    isSidebar,
    toggleSidebar,
    title
}: {
    isSidebar: boolean
    toggleSidebar: () => void
    title: string
}) {
    return (
        <header
            className={`fixed left-0 right-0 z-40 flex h-headerHight items-center justify-between border-b bg-white px-8 md:border-none ${isSidebar ? 'lg:left-64' : 'lg:left-24'} `}
        >
            <FaBars className="cursor-pointer text-2xl text-darkGrey lg:hidden" onClick={toggleSidebar} />
            <div className="hidden lg:block">
                <h2 className="text-xl font-medium">{title}</h2>
            </div>
            <div className="flex items-center gap-5">
                <Link to={routes.notification}>
                    <FaRegBell className="size-5 cursor-pointer text-black" />
                </Link>
                <UserButton />
            </div>
        </header>
    )
}

export default InstructorHeader
