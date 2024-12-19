import { homeSidebar } from '@/constants'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="flex-shrink-0">
            <div className="w-sidebarWidth sticky left-0 top-20 z-10 flex flex-col items-center px-2">
                {homeSidebar.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-2xl"
                    >
                        {item.icon && <item.icon className="size-5" />}
                        <p className="text-xs font-medium text-black">{item.title}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default SideBar
