import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { MdKeyboardArrowDown } from 'react-icons/md'

import logo from '@/assets/Union.svg'
import routes from '@/configs/routes'
import { sidebarList } from '@/constants'

const UserSidebar = ({ isOpen }: { isOpen: boolean }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleChildren = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <aside
            className={`fixed z-50 min-h-screen w-full max-w-[60vw] bg-white px-5 transition-transform duration-300 md:max-w-[50vw] lg:max-w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
            <div className="flex flex-col gap-8 pt-6">
                <Link to={routes.home} className="flex items-center justify-center gap-2">
                    <div className="h-10 w-10">
                        <img src={logo} alt="Coursea" className="h-f w-full object-cover" />
                    </div>
                    <h2 className="text-3xl font-medium text-black">Coursea</h2>
                </Link>
                <div className="flex flex-col gap-5">
                    {sidebarList.map((item, index) => (
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
                                    <p className="text-base">{item.title}</p>
                                </div>
                                {item.children && <MdKeyboardArrowDown />}
                            </NavLink>

                            {item.children && openIndex === index && (
                                <div className="mt-4 flex flex-col gap-4">
                                    {item.children.map((child, childIndex) => (
                                        <NavLink
                                            to={child.path}
                                            className="px-5 py-3.5 hover:bg-softGrey hover:transition-all"
                                            key={childIndex}
                                        >
                                            <p>{child.title}</p>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default UserSidebar
