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

export interface ITeacherBalance {
    id: number
    id_user: number
    balance: string
    status: number
}

export interface IRequestWithDrawData {
    coin: number
    bank_name: string
    account_number: string
    account_holder: string
}

export interface IHistoryDraw {
    id: number
    coin: number
    amount: number
    back_name: string
    account_name: string
    account_holder: string
    status: string
    note: string
    name: string
}

export interface ITeacherHistoryDraw {
    status: string
    message: string
    data: IHistoryDraw[]
}
