import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
            <div className="text-center">
                <p className="text-5xl font-semibold text-secondaryRed">404</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Không tìm thấy nội dung
                </h1>
                <p className="mt-6 text-lg leading-6">URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
                <p className="mt-4 text-lg leading-6">
                    Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL đã lưu.
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
