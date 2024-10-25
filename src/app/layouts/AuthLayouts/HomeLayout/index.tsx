import Footer from '@/app/layouts/AuthLayouts/Components/Footer'
import Header from '@/app/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="mt-[120px] min-h-screen">
                <div className="container-main flex-1 pb-10 pt-5">{children}</div>
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout
