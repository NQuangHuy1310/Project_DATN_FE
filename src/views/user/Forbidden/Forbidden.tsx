import { Button } from '@/components/ui/button'
import routes from '@/configs/routes'
import { Link } from 'react-router-dom'

export default function Forbidden() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
            <div className="text-center">
                <p className="text-5xl font-semibold text-secondaryRed">403</p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Truy cập bị từ chối
                </h1>
                <p className="mt-6 text-lg leading-6">
                    Bạn không có quyền truy cập vào trang này. Vui lòng kiểm tra lại quyền truy cập của bạn hoặc liên hệ
                    với quản trị viên.
                </p>
                <p className="mt-4 text-lg leading-6">
                    Nếu bạn nghĩ rằng đây là một lỗi, hãy thử truy cập lại từ trang chủ hoặc liên hệ với chúng tôi để
                    được hỗ trợ.
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
