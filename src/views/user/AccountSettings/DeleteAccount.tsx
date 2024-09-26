import { Button } from '@/components/ui/button'

const DeleteAccount = () => {
    return (
        <div className="flex flex-col gap-5">
            <p className="max-w-[620px] text-sm text-darkGrey">
                Khi bạn xoá tài khoản của mình, bạn sẽ mất quyền truy cập vào dịch vụ tài khoản trên Coursea, và chúng
                tôi sẽ xoá vĩnh viễn dữ liệu cá nhân của bạn. Bạn có thể hủy việc xoá trong vòng 14 ngày.
            </p>
            <div className="flex items-center gap-2">
                <input id="deleteAccount" type="checkbox" className="size-4" />
                <label htmlFor="deleteAccount" className="text-sm font-medium text-black">
                    Xác nhận xoá tài khoản
                </label>
            </div>
            <div className="flex items-center gap-5">
                <Button variant="outline">Tìm hiểu thêm</Button>
                <Button variant="destructive">Xoá tài khoản</Button>
            </div>
        </div>
    )
}

export default DeleteAccount
