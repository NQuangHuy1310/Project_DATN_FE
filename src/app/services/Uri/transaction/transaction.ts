const TRANSACTION_URL = 'transactions/'
export const transactionUri = {
    ADD_PAYMENT: (userId: number) => `${TRANSACTION_URL}payment/${userId}`,
    BUY_COURSE: (userId: number, courseId: number) => `${TRANSACTION_URL}buy-course/${userId}/${courseId}`
}
