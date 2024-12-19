import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import routes from '@/configs/routes'
import Banner from '@/assets/homeBanner.png'
import inspire from '@/assets/prop-inspire-v3.png'
import teacher from '@/assets/prop-teach-v3.png'
import rewarded from '@/assets/prop-get-rewarded-v3.png'
import { Button } from '@/components/ui/button'
import useGetUserProfile from '@/app/hooks/accounts/useGetUser'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useUserStore } from '@/app/store'

const InstructorRegis = () => {
    const [checkProfile, setCheckProfile] = useState<boolean>(false)
    const { profile } = useGetUserProfile()
    const navigate = useNavigate()

    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (user?.status == 'approved') {
            navigate(routes.userDashboard)
        }
    }, [])

    const handleCheckProfile = () => {
        if (!profile) {
            setCheckProfile(true)
        } else {
            navigate(routes.instructorRegisterQuestion)
        }
    }
    return (
        <>
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-semibold">Hãy đến dạy cùng chúng tôi</h2>
                        <p>Trở thành 1 người hướng dẫn và thay đổi cuộc sống của chính bạn</p>
                    </div>
                    <Button onClick={handleCheckProfile} className="w-fit">
                        Đăng ký ngay
                    </Button>
                </div>
                <div className="max-w-[400px]">
                    <img className="w-full rounded-md" src={Banner} alt="" />
                </div>
            </div>
            <div className="mx-auto mt-10 flex max-w-6xl justify-between">
                <div className="flex max-w-[380px] flex-col gap-2 text-center">
                    <img className="mx-auto" src={teacher} alt="" />
                    <h3 className="text-lg font-medium">Dạy theo cách của bạn</h3>
                    <p>Xuất bản khóa học bạn muốn theo cách của bạn và luôn kiểm soát được nội dung của chính mình.</p>
                </div>
                <div className="flex max-w-[380px] flex-col gap-2 text-center">
                    <img className="mx-auto" src={inspire} alt="" />
                    <h3 className="text-lg font-medium">Truyền cảm hứng cho người học</h3>
                    <p>
                        Dạy những gì bạn biết và giúp người học khám phá được sở thích của mình, học các kỹ năng mới và
                        thăng tiến trong sự nghiệp.
                    </p>
                </div>
                <div className="flex max-w-[380px] flex-col gap-2 text-center">
                    <img className="mx-auto" src={rewarded} alt="" />
                    <h3 className="text-lg font-medium">Nhận thưởng</h3>
                    <p>Mở rộng mạng lưới chuyên môn, xây dựng chuyên môn và kiếm tiền từ mỗi lần trả phí.</p>
                </div>
            </div>
            <AlertDialog open={checkProfile} onOpenChange={() => setCheckProfile(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Thông tin của bạn chưa đầy đủ</AlertDialogTitle>
                        <AlertDialogDescription>
                            Vui lòng cập nhật đẩy đủ thông tin trước khi đăng kí trở thành giảng viên của chúng tôi
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={() => navigate(routes.accountProfile)}>Cập nhật</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default InstructorRegis
