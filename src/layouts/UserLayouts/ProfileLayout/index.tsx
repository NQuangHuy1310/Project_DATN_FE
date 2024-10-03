import { useEffect, useState } from 'react'

import UserAside from '@/layouts/UserLayouts/Components/UserAside'
import UserHeader from '@/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const ProfileLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
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
                <UserHeader toggleSidebar={toggleSidebar} title={title} />
                <main className="mt-[80px] flex min-h-screen w-full flex-wrap items-start gap-7 bg-softGrey p-8">
                    <UserAside />
                    <div className="card flex-1">{children}</div>
                </main>
            </article>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    )
}

export default ProfileLayout
