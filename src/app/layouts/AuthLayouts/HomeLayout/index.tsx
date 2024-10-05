import Footer from '@/app/layouts/AuthLayouts/Components/Footer'
import Header from '@/app/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="mx-auto h-screen max-w-screen-mainScreen px-4 md:px-8 lg:px-0">{children}</main>
            <Footer />
        </div>
    )
}

export default HomeLayout
