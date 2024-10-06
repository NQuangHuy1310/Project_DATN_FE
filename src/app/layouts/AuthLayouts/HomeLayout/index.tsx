import Footer from '@/app/layouts/AuthLayouts/Components/Footer'
import Header from '@/app/layouts/AuthLayouts/Components/Header'
import SideBar from '@/app/layouts/AuthLayouts/Components/SideBar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="mt-headerHight flex min-h-screen">
                <SideBar />
                <div className="flex-1 p-4">{children}</div>
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout
