import { useEffect, useState } from 'react'

import UserHeader from '@/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebarElement = document.querySelector('aside')
            if (isSidebarOpen && sidebarElement && !sidebarElement.contains(event.target as Node)) {
                setIsSidebarOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSidebarOpen])

    return (
        <div className="flex">
            <UserSidebar isOpen={isSidebarOpen} />
            <article className="w-full lg:ps-64">
                <UserHeader toggleSidebar={toggleSidebar} />
                <main className="mt-[80px] min-h-screen w-full bg-softGrey p-7">{children}</main>
            </article>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[998] bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    )
}

export default Dashboard
