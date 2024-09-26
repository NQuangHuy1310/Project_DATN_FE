import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'

import logo from '@/assets/Union.png'
import routes from '@/configs/routes'
import { sidebarList } from '@/constants'

const UserSidebar = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleChildren = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <aside className="fixed min-h-screen w-full max-w-64 border-r bg-white px-5">
            <div className="flex flex-col gap-8 pt-6">
                <Link to={routes.home} className="flex justify-center gap-2">
                    <div className="h-10 w-10">
                        <img src={logo} alt="Coursea" className="h-f w-full object-cover" />
                    </div>
                    <p className="text-3xl font-medium text-black">Coursea</p>
                </Link>
                <div className="flex flex-col gap-5">
                    {sidebarList.map((item, index) => (
                        <div key={index} className="">
                            <NavLink
                                to={item.path}
                                className="flex items-center justify-between gap-5 rounded-sm px-5 py-3.5 hover:bg-[#f5f5f7] hover:transition-all"
                                onClick={() => toggleChildren(index)}
                            >
                                <div className="flex gap-5">
                                    {item.icon && <item.icon className="size-6 text-black" />}
                                    <p className="text-base font-semibold text-black">{item.title}</p>
                                </div>
                                {item.children && <MdKeyboardArrowDown />}
                            </NavLink>

                            {item.children && openIndex === index && (
                                <div className="flex flex-col gap-2">
                                    {item.children.map((child, childIndex) => (
                                        <NavLink to={child.path} className="px-5 py-4" key={childIndex}>
                                            <p className="text-black">{child.title}</p>
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
