import { useEffect, useState } from 'react'

import InstructorHeader from '@/app/layouts/InstructorLayouts/Components/InstructorHeader/InstructorHeader'
import InstructorSidebar from '@/app/layouts/InstructorLayouts/Components/InstructorSidebar/InstructorSidebar'

const InstructorDashboard = ({ children, title }: { children: React.ReactNode; title: string }) => {
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
            <InstructorSidebar isOpen={isSidebarOpen} />
            <article className="w-full lg:ps-64">
                <InstructorHeader toggleSidebar={toggleSidebar} title={title} />
                <main className="mt-[80px] min-h-screen w-full bg-softGrey p-4">
                    <div className="card">{children}</div>
                </main>
            </article>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    )
}

export default InstructorDashboard
