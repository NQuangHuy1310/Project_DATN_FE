export interface IRecharge {
    cent: number
    cash: number
}
export interface ITransaction {
    amount: number
    balance?: number
}
export interface IHistory {
    user_name: string
    transaction_id: number
    coin_unit: number
    amount: number
    coin: number
    status: string
    date_of_transaction: Date
}
