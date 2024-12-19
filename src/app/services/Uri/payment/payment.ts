const PAYMENT_URL = 'payment/'
export const paymentUri = {
    GET_COURSE: (slug: string) => `${PAYMENT_URL}course/${slug}`,
    BUY_COURSE: (userId: number, courseId: number) => `transactions/buy-course/${userId}/${courseId}`,
    NEW_VOUCHER: 'vouchers/new-voucher',
    APPLY_VOUCHER: (userId: number, voucher: string) => `vouchers/apply-coupon/${userId}/${voucher}`
}
