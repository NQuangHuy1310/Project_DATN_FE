import { Link } from 'react-router-dom'

import routes from '@/configs/routes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ChangePassword = () => {
    return (
        <div className="flex max-w-[350px] flex-col items-start gap-4">
            <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Mật khẩu hiện tại</label>
                <Input type="password" placeholder="Mật khẩu hiện tại" />
            </div>
            <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Mật khẩu mới</label>
                <Input type="password" placeholder="Mật khẩu mới" />
            </div>
            <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Xác nhận mật khẩu mới</label>
                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
            </div>
            <div className="flex items-center gap-5">
                <Button>Lưu thay đổi</Button>
                <Link to={routes.forgotPassword}>
                    <Button variant="ghost">Quên mật khẩu ?</Button>
                </Link>
            </div>
        </div>
    )
}

export default ChangePassword
