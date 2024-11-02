const TRANSACTION_URL = 'transactions/'
export const transactionClientUri = {
    ADD_PAYMENT: (userId: number) => `${TRANSACTION_URL}payment/${userId}`,
    GET_HISTORY: (userId: number) => `user/history-transactions/${userId}`
}
