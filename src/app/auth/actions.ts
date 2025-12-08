
'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAdminStatus(orderId: number, status: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('orders')
        .update({ admin_status: status })
        .eq('id', orderId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
}
