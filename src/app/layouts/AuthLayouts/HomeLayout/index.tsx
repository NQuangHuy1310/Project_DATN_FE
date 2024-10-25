import Footer from '@/app/layouts/AuthLayouts/Components/Footer'
import Header from '@/app/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-softGrey">
            <Header />
            <main className="mt-[120px] min-h-screen">
                <div className="mx-auto max-w-[1200px] flex-1">{children}</div>
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout
