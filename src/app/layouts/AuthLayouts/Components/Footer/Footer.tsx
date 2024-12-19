import logo from '@/assets/Union.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="bg-black px-4 py-10 text-white md:px-20 lg:px-44 lg:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
                <div className="col-span-12 flex flex-col gap-6 md:col-span-6 lg:col-span-4">
                    <div className="flex items-center gap-2">
                        <div className="h-[38px] w-[38px]">
                            <img
                                src={logo}
                                alt="Coursea - Học trực tuyến"
                                className="h-full w-full rounded-sm object-cover"
                            />
                        </div>
                        <p className="text-base font-semibold">Coursea - Nền Tảng Học Trực Tuyến</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Điện thoại:</strong> 0123456789
                        </p>
                        <p>
                            <strong>Email:</strong> contact@gmail.com
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> 123 Đường ABC, TP. HCM
                        </p>
                    </div>
                </div>
                <div className="col-span-12 flex flex-col gap-3 md:col-span-6 lg:col-span-3">
                    <h4 className="text-base font-medium uppercase">Về chúng tôi</h4>
                    <Link className="footer-link" to="">
                        Giới thiệu
                    </Link>
                    <Link className="footer-link" to="">
                        Liên hệ
                    </Link>
                    <Link className="footer-link" to="">
                        Điều khoản
                    </Link>
                    <Link className="footer-link" to="">
                        Bảo mật
                    </Link>
                </div>
                <div className="col-span-12 flex flex-col gap-3 md:col-span-6 lg:col-span-3">
                    <h4 className="text-base font-medium uppercase">Chính sách và điều khoản</h4>
                    <Link className="footer-link" to="">
                        Chính sách bảo mật
                    </Link>
                    <Link className="footer-link" to="">
                        Điều khoản dịch vụ
                    </Link>
                    <Link className="footer-link" to="">
                        Chính sách hoàn tiền
                    </Link>
                    <Link className="footer-link" to="">
                        Chính sách xử lý khiếu nại
                    </Link>
                </div>
                <div className="col-span-12 flex flex-col gap-3 md:col-span-6 lg:col-span-2">
                    <h4 className="text-base font-medium uppercase">Hỗ trợ khách hàng</h4>
                    <Link className="footer-link" to="">
                        Câu hỏi thường gặp
                    </Link>
                    <Link className="footer-link" to="">
                        Hướng dẫn sử dụng
                    </Link>
                    <Link className="footer-link" to="">
                        Gửi yêu cầu hỗ trợ
                    </Link>
                    <Link className="footer-link" to="">
                        Liên hệ bộ phận hỗ trợ
                    </Link>
                </div>
            </div>
            <p className="mt-10 text-center text-sm">© 2024 Coursea. Nền tảng học trực tuyến hàng đầu Việt Nam</p>
        </div>
    )
}

export default Footer
