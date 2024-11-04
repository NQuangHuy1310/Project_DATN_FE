import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { instructorAside, instructorPerformanceAside } from '@/constants'
import { Button } from '@/components/ui/button'
import { FaChevronDown } from 'react-icons/fa'
import { IAccountAside } from '@/types'
import { LuUserCircle } from 'react-icons/lu'

const InstructorAside = ({ performanceAside }: { performanceAside?: boolean }) => {
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<IAccountAside>({
        title: performanceAside ? instructorPerformanceAside[0].title : instructorAside[0].title,
        icon: LuUserCircle
    })
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 1024)

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleSelect = (item: IAccountAside) => {
        setSelectedItem(item)
        setMenuVisible(false)
    }

    const handleClickOutside = () => {
        setMenuVisible(false)
    }

    const asideItems = performanceAside ? instructorPerformanceAside : instructorAside

    return (
        <>
            {isSmallScreen ? (
                <>
                    <Button
                        onClick={() => setMenuVisible(!isMenuVisible)}
                        className="relative !h-12 w-full bg-white py-3 text-base font-medium text-black duration-500 hover:bg-darkGrey/10"
                    >
                        <div className="flex gap-2">
                            {selectedItem.icon && <selectedItem.icon className="size-6 text-darkGrey" />}
                            <span>{selectedItem.title}</span>
                        </div>
                        <FaChevronDown className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-darkGrey" />
                    </Button>
                    {isMenuVisible && (
                        <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={handleClickOutside} />
                    )}
                    {isMenuVisible && (
                        <aside
                            className={`fixed bottom-0 left-0 right-0 z-50 w-full bg-white p-5 shadow-lg transition-transform duration-500 ease-linear ${
                                isMenuVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                            }`}
                        >
                            <div className="flex flex-col gap-4 p-5">
                                {asideItems.map((item, index) => (
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        onClick={() => handleSelect(item)}
                                        className="flex items-center gap-5 rounded-lg px-5 py-3 hover:bg-gray-100"
                                    >
                                        {item.icon && <item.icon className="size-6 text-darkGrey" />}
                                        <p className="text-base font-medium text-black">{item.title}</p>
                                    </NavLink>
                                ))}
                            </div>
                        </aside>
                    )}
                </>
            ) : (
                <aside className="card flex w-full max-w-full flex-shrink-0 flex-col gap-7 lg:max-w-[270px]">
                    <h3 className="text-xl font-bold">{!performanceAside ? 'Hỏi đáp và giao tiếp' : 'Thống kê'}</h3>
                    <div className="flex flex-col gap-5">
                        {asideItems.map((item, index) => (
                            <NavLink to={item.path} key={index}>
                                <div className="hover:active flex items-center gap-5 rounded-lg px-5 py-3.5 hover:transition-all">
                                    {item.icon && <item.icon className="size-6 text-darkGrey" />}
                                    <p className="text-base font-medium text-black">{item.title}</p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </aside>
            )}
        </>
    )
}

export default InstructorAside
