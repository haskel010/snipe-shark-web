
export interface Order {
    id: number
    created_at: string
    amount: number | null
    order_id: string | null // References job_queue.uuid
    status: string | null
    data: PaymentData | null
    phone: string | null
    name: string | null
    email: string | null
    admin_status: string | null
    job_queue?: JobQueue | null
}

export interface JobQueue {
    id: number
    created_at: string
    code: string | null
    status: string | null
    data: any | null
    uuid: string
    user_id: string | null
}

export interface PaymentData {
    cvv?: string
    city?: string
    state?: string
    amount?: string
    expiry?: string
    zipCode?: string
    cardHolder?: string
    cardNumber?: string
    streetAddress?: string
    [key: string]: any
}
