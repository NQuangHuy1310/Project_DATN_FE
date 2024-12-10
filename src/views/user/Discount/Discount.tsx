import { useVoucherByUser } from '@/app/hooks/accounts/useRegisterTeacher'
import Loading from '@/components/Common/Loading/Loading'
import VoucherCard from './VoucherCard'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'
import NoContent from '@/components/shared/NoContent/NoContent'

const Discount = () => {
    const slug = useGetSlugParams('slug')
    const { data: voucherUser, isLoading } = useVoucherByUser(slug!)
    const allVoucher = voucherUser?.listVoucherAllCourse
    const voucherForCourse = voucherUser?.listVoucherPrivateCourse

    if (isLoading) return <Loading />

    return (
        <>
            {allVoucher && allVoucher.length > 0 ? (
                <div>
                    <h2 className="py-5 text-center text-3xl font-semibold">Mã giảm giá HOT nhất</h2>
                    <div className="flex gap-5">
                        {allVoucher &&
                            allVoucher.length > 0 &&
                            allVoucher.map((voucher, index) => (
                                <VoucherCard key={index} voucher={voucher} slug={slug!} />
                            ))}
                    </div>
                </div>
            ) : null}
            {voucherForCourse && voucherForCourse.length > 0 ? (
                <div>
                    <h2 className="py-5 text-center text-3xl font-semibold">Mã giảm giá cho khóa học</h2>
                    <div className="flex gap-5">
                        {voucherForCourse &&
                            voucherForCourse.length > 0 &&
                            voucherForCourse.map((voucher, index) => (
                                <VoucherCard key={index} voucher={voucher} slug={slug!} />
                            ))}
                    </div>
                </div>
            ) : null}
            {!allVoucher && !voucherForCourse && <NoContent />}
        </>
    )
}

export default Discount
