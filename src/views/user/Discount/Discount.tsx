import { useVoucherByUser } from '@/app/hooks/accounts/useRegisterTeacher'
import Loading from '@/components/Common/Loading/Loading'
import VoucherCard from './VoucherCard'
import { useGetSlugParams } from '@/app/hooks/common/useCustomParams'

const Discount = () => {
    const { data: voucherUser, isLoading } = useVoucherByUser()
    const slug = useGetSlugParams('slug')
    if (isLoading) return <Loading />

    return (
        <>
            <h2 className="py-5 text-center text-3xl font-semibold">Mã giảm giá HOT nhất</h2>
            <div className="flex gap-5">
                {voucherUser &&
                    voucherUser.length > 0 &&
                    voucherUser.map((voucher, index) => <VoucherCard key={index} voucher={voucher} slug={slug!} />)}
            </div>
        </>
    )
}

export default Discount
