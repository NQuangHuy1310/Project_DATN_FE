import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import logo from '@/assets/Union.svg'
import routes from '@/configs/routes'
import { sidebarListInstructor } from '@/constants'

const InstructorSidebar = ({
    isOpen,
    isSidebar,
    handleSidebar
}: {
    isOpen: boolean
    isSidebar: boolean
    handleSidebar: () => void
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

    const toggleChildren = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 1024)
        }
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    return (
        <aside
            className={`fixed z-50 min-h-screen w-full max-w-[60vw] bg-white px-4 transition-all duration-300 md:max-w-[50vw] ${isSidebar ? 'lg:max-w-64' : 'lg:max-w-24'} ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
            <div className="relative flex flex-col gap-8 pt-6">
                <Link to={routes.home} className="flex items-center justify-center gap-2">
                    <div className="h-10 w-10">
                        <img src={logo} alt="Coursea" className="h-f w-full rounded-md object-cover" />
                    </div>
                    {(isSidebar || isSmallScreen) && <h2 className="text-3xl font-medium text-black">Coursea</h2>}
                </Link>
                <div className="flex flex-col gap-5">
                    {sidebarListInstructor.map((item, index) => (
                        <div key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center justify-between gap-5 rounded-sm px-5 py-3.5 ${isActive ? 'bg-softGrey font-medium text-black' : 'text-darkGrey hover:bg-softGrey hover:text-black hover:transition'}`
                                }
                                onClick={() => toggleChildren(index)}
                            >
                                <div className="flex gap-5">
                                    {item.icon && <item.icon className="size-6" />}
                                    {(isSidebar || isSmallScreen) && (
                                        <p className="whitespace-nowrap text-base">{item.title}</p>
                                    )}
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
                <div
                    onClick={handleSidebar}
                    className="absolute -right-7 top-[50vh] hidden cursor-pointer rounded-md bg-white lg:block"
                >
                    {isSidebar ? <HiChevronLeft className="size-8" /> : <HiChevronRight className="size-8" />}
                </div>
            </div>
        </aside>
    )
}

export default InstructorSidebar
