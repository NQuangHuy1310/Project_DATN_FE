import { Button } from '@/components/ui/button'
import { accountAside } from '@/constants'
import { NavLink } from 'react-router-dom'

const UserAside = () => {
    return (
        <aside className="flex w-full max-w-[350px] flex-shrink-0 flex-col gap-7 rounded-2xl bg-white p-7">
            <h3 className="text-2xl font-bold">Cập nhật và quản lý tài khoản</h3>
            <div className="flex flex-col gap-7">
                {accountAside.map((item, index) => (
                    <NavLink to={item.path} key={index}>
                        <div className="hover:active flex items-center gap-5 rounded-lg px-5 py-3.5 hover:transition-all">
                            <item.icon className="size-6 text-darkGrey" />
                            <p className="text-base font-medium text-black">{item.title}</p>
                        </div>
                    </NavLink>
                ))}
                <Button variant="outline" className="font-medium">
                    Logout
                </Button>
            </div>
        </aside>
    )
}

export default UserAside
