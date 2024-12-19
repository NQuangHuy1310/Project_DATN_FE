import Footer from '@/app/layouts/AuthLayouts/Components/Footer'
import Header from '@/app/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main className="min-h-screen">
                <div className="flex-1">{children}</div>
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout
