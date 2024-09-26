import UserAside from '@/layouts/UserLayouts/Components/UserAside'
import UserHeader from '@/layouts/UserLayouts/Components/UserHeader/UserHeader'
import UserSidebar from '@/layouts/UserLayouts/Components/UserSidebar/UserSidebar'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <UserSidebar />
            <article className="w-full ps-64">
                <UserHeader />
                <main className="mt-[80px] flex h-screen w-full items-start gap-7 bg-softGrey p-8">
                    <UserAside />
                    <div className="flex-1 rounded-lg bg-white p-7">{children}</div>
                </main>
            </article>
        </div>
    )
}

export default ProfileLayout
