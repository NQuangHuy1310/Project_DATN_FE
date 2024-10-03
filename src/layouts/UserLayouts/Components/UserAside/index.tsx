import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdError } from 'react-icons/md'

import { authApis } from '@/apis'
import routes from '@/configs/routes'
import { useUserStore } from '@/store'
import { accountAside } from '@/constants'
import { removeAccessToken } from '@/utils'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { FaChevronDown } from 'react-icons/fa'
import { IAccountAside } from '@/types'
import { LuUserCircle } from 'react-icons/lu'

const UserAside = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<IAccountAside>({
        title: accountAside[0].title,
        icon: LuUserCircle
    })
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 1024)

    const clearUserAndProfile = useUserStore((state) => state.clearUserAndProfile)

    const handleLogout = async () => {
        await authApis.logout()
        removeAccessToken()
        clearUserAndProfile()
        navigate(routes.home)
    }

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
                            className={`fixed bottom-0 left-0 z-50 w-full bg-white p-5 shadow-lg transition-transform duration-500 ease-in-out ${
                                isMenuVisible ? 'translate-y-0' : 'translate-y-full'
                            }`}
                        >
                            <div className="flex flex-col gap-4 p-5">
                                {accountAside.map((item, index) => (
                                    <NavLink
                                        to={item.path}
                                        key={index}
                                        onClick={() => handleSelect(item)}
                                        className="flex items-center gap-5 rounded-lg px-5 py-3 hover:bg-gray-100"
                                    >
                                        <item.icon className="size-6 text-darkGrey" />
                                        <p className="text-base font-medium text-black">{item.title}</p>
                                    </NavLink>
                                ))}
                                <Button
                                    onClick={() => setOpen(true)}
                                    variant="destructive"
                                    size="lg"
                                    className="text-base font-medium"
                                >
                                    Đăng xuất
                                </Button>
                            </div>
                        </aside>
                    )}
                </>
            ) : (
                <aside className="flex w-full max-w-full flex-shrink-0 flex-col gap-7 rounded-2xl bg-white p-7 lg:max-w-[350px]">
                    <h3 className="text-xl font-bold">Cập nhật và quản lý tài khoản</h3>
                    <div className="flex flex-col gap-7">
                        {accountAside.map((item, index) => (
                            <NavLink to={item.path} key={index}>
                                <div className="hover:active flex items-center gap-5 rounded-lg px-5 py-3.5 hover:transition-all">
                                    <item.icon className="size-6 text-darkGrey" />
                                    <p className="text-base font-medium text-black">{item.title}</p>
                                </div>
                            </NavLink>
                        ))}
                        <Button
                            onClick={() => setOpen(true)}
                            variant="destructive"
                            size="lg"
                            className="text-base font-medium"
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </aside>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center gap-5 p-7 text-center sm:max-w-[425px]">
                    <div className="flex size-12 items-center justify-center rounded-full bg-destructive">
                        <MdError className="size-6 text-white" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-black"> Đăng xuất tài khoản</DialogTitle>
                    <DialogDescription className="max-w-[315px] text-sm text-darkGrey">
                        Bạn có chắc chắn muốn đăng xuất khỏi Tài khoản của mình Coursea không ?
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" size="lg">
                                Huỷ
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive" size="lg" onClick={handleLogout}>
                            Đăng xuất
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default UserAside
