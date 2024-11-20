const TRANSACTION_URL = 'transactions/'
export const transactionClientUri = {
    ADD_PAYMENT: (userId: number) => `${TRANSACTION_URL}payment/${userId}`,
    GET_HISTORY: (userId: number, page: number, perPage?: number) =>
        `user/history-transactions/${userId}?page=${page}${perPage ? `&perPage=${perPage}` : ''}`
}

export const transactionInstructorUri = {
    GET_BALANCE: (userId: number) => `teacher/balance/${userId}}`,
    REQUEST_WITHDRAW: (userId: number) => `teacher/add-request-withdraw/${userId}`,
    HISTORY_WITHDRAW: (userId: number) => `teacher/history-withdraw/${userId} `
}
