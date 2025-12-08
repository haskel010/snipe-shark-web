
import { createClient } from '@/utils/supabase/server'
import { OrdersTable } from '@/components/dashboard/orders-table'
import { Order } from '@/types/database'

export default async function DashboardPage() {
    const supabase = await createClient()

    // Fetch orders and join with job_queue to get the status
    // Note: For inner join or foreign key access, the syntax is resource!fk(columns) or resource(columns)
    // Assuming 'orders_order_id_fkey' is the foreign key name or based on the relationship.
    // We can try extracting everything.

    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
      *,
      job_queue (
        status,
        code,
        user_id,
        data
      )
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching orders:', error)
        // Handle error appropriately in UI
    }

    // Cast type or ensure it matches. 
    // Supabase complex joins return nested objects. Our Order interface supports optional job_queue.
    const typedOrders = (orders as unknown as Order[]) || []

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <OrdersTable orders={typedOrders} />
            </div>
        </div>
    )
}
