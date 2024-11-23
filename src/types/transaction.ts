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
export interface IHistoryPage {
    data: IHistory[]
    per_page: number
    current_page: number
    total: number
}
export interface ITeacherBalance {
    id: number
    id_user: number
    balance: string
    status: number
}

export interface IRequestWithDrawData {
    id?: number
    coin: number
    amount?: number
    bank_name: string
    account_number: string
    account_holder: string
    name?: string
    status?: string
    note?: string
}

export interface IHistoryDraw {
    data: IRequestWithDrawData[]
    per_page: number
    current_page: number
    total: number
}

export interface ITeacherHistoryDraw {
    status: string
    message: string
    data: IHistoryDraw[]
}
