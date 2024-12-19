import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import { Link } from 'react-router-dom'

export default function ServerError() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
            <div className="text-center">
                <p className="text-5xl font-semibold text-secondaryRed">500</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Đã xảy ra lỗi trên máy chủ
                </h1>
                <p className="mt-6 text-lg leading-6">
                    Chúng tôi xin lỗi, nhưng có một vấn đề xảy ra trong quá trình xử lý yêu cầu của bạn.
                </p>
                <p className="mt-4 text-lg leading-6">
                    Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ để được giúp đỡ.
                </p>

                <div className="mt-8 flex items-center justify-center gap-x-6">
                    <Link to={routes.home}>
                        <Button size="lg">Quay lại trang chủ</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
