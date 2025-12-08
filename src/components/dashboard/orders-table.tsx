
'use client'

import { Order } from "@/types/database"
import { columns } from "@/components/dashboard/orders/columns"
import { DataTable } from "@/components/dashboard/orders/data-table"

interface OrdersTableProps {
    orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <DataTable columns={columns} data={orders} />
    )
}
