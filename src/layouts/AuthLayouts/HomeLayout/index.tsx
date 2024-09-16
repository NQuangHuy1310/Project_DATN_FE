import Footer from '@/layouts/AuthLayouts/Components/Footer'
import Header from '@/layouts/AuthLayouts/Components/Header'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default HomeLayout
