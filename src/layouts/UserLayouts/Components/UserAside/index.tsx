import { useState } from 'react'
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

const UserAside = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const clearUserAndProfile = useUserStore((state) => state.clearUserAndProfile)

    const handleLogout = async () => {
        await authApis.logout()
        removeAccessToken()
        clearUserAndProfile()
        navigate(routes.home)
    }

    return (
        <>
            <aside className="flex w-full max-w-[350px] flex-shrink-0 flex-col gap-7 rounded-2xl bg-white p-7">
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
