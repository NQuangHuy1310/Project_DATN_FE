import UserHeader from '@/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <UserSidebar />
            <article className="w-full ps-64">
                <UserHeader />
                <main className="mt-[80px] h-screen w-full bg-softGrey p-8">{children}</main>
            </article>
        </div>
    )
}

export default UserLayout
