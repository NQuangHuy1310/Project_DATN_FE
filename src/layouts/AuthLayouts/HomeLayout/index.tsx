import Footer from '@/layouts/AuthLayouts/Components/Footer'
import Header from '@/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="max-w-screen-mainScreen h-screen mx-auto lg:px-0 md:px-8 px-4">{children}</main>
            <Footer />
        </div>
    )
}

export default HomeLayout
