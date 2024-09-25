import UserHeader from '@/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <UserSidebar />
            <article className="ps-64 w-full">
                <UserHeader />
                <main className="max-w-screen-mainScreen h-screen mx-auto px-[30px] mt-[102px]">{children}</main>
            </article>
        </div>
    )
}

export default UserLayout
