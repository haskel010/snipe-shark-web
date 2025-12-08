
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Order } from "@/types/database"
import { format } from "date-fns"
import { Copy, Eye, ArrowUpDown, FileText } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PaymentCard } from "@/components/dashboard/payment-card"
import { BillTemplate } from "@/components/dashboard/bill-template"

export const columns: ColumnDef<Order>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium">#{row.getValue("id")}</div>,
    },
    {
        id: "code",
        header: "Code",
        cell: ({ row }) => {
            const order = row.original
            const code = order.job_queue?.code
            return (
                <div className="font-mono text-xs flex items-center gap-2">
                    {code || '-'}
                    {code && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => {
                                navigator.clipboard.writeText(code)
                                toast.success("Code copied to clipboard")
                            }}
                        >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy code</span>
                        </Button>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{format(new Date(row.getValue("created_at")), 'PPP')}</div>,
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <div>{row.getValue("phone") || '-'}</div>,
    },
    {
        id: "job_status",
        header: "Job Status",
        accessorFn: (row) => row.job_queue?.status || 'unknown',
        cell: ({ row }) => {
            const status = row.getValue("job_status") as string
            return (
                <Badge variant={status === 'completed' ? 'default' : status === 'failed' ? 'destructive' : 'secondary'}>
                    {status}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "status",
        header: "Order Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant="outline" className={
                    status === 'collected' ? 'border-green-500 text-green-500' : ''
                }>
                    {status || 'unknown'}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="text-right w-full"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            return <div className="text-right font-medium">{!isNaN(amount) ? `$${amount.toFixed(2)}` : '-'}</div>
        },
        filterFn: (row, id, value) => {
            const amount = row.getValue(id) as number | null
            if (amount === null) return false
            return amount.toString().includes(value)
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original
            const jobStatus = order.job_queue?.status || 'unknown'
            const orderStatus = order.status || 'unknown'
            const showPaymentDetails = ((orderStatus === 'collected' || orderStatus === 'failed' || jobStatus === 'failed') && order.data)

            return (
                <div className="flex items-center">
                    {showPaymentDetails && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" title="View Payment Details">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Payment Details</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center p-4">
                                    <PaymentCard data={order.data!} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                    {order.job_queue?.data && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" title="View Bill">
                                    <FileText className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px] sm:max-w-none p-6">
                                <BillTemplate data={order.job_queue?.data} />
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            )
        }
    }
]
