/* eslint-disable no-unused-vars */
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

interface OTPDialogProps {
    open: boolean
    resendOtp: () => void
    setOpen: (open: boolean) => void
    onSubmit: (value: string) => void
}

const OTPDialog = ({ open, setOpen, onSubmit, resendOtp }: OTPDialogProps) => {
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (value) {
            onSubmit(value)
            setOpen(false)
            setValue('')
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nhập code xác thực tài khoản</DialogTitle>
                    <DialogDescription>Nhập code bạn nhập được ở email để xác thực tài khoản</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center w-full">
                    <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => resendOtp()}>
                        Gửi lại
                    </Button>
                    <Button type="submit" onClick={() => handleSubmit()}>
                        Xác nhận
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OTPDialog
