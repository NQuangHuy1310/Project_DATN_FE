const TRANSACTION_URL = 'transactions/'
export const transactionUri = {
    ADD_PAYMENT: (userId: number) => `${TRANSACTION_URL}payment/${userId}`
}
