import { useEffect, useState } from 'react'

import InstructorHeader from '@/app/layouts/InstructorLayouts/Components/InstructorHeader/InstructorHeader'
import InstructorSidebar from '@/app/layouts/InstructorLayouts/Components/InstructorSidebar/InstructorSidebar'
import InstructorAside from '@/app/layouts/InstructorLayouts/Components/InstructorAside/InstructorAside'

const InstructorCommunicate = ({ children, title }: { children: React.ReactNode; title: string }) => {
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
                <main className="mt-[80px] flex w-full flex-wrap items-start gap-4 bg-softGrey p-4 lg:min-h-[89vh] lg:flex-nowrap">
                    <InstructorAside />
                    <div className="card w-full">{children}</div>
                </main>
            </article>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />
            )}
        </div>
    )
}

export default InstructorCommunicate
