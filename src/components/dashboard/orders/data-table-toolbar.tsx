
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ExternalLink, RefreshCw } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const router = useRouter()
    const [isRefreshing, setIsRefreshing] = React.useState(false)
    const isFiltered = table.getState().columnFilters.length > 0
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const handleRefresh = async () => {
        setIsRefreshing(true)
        router.refresh()
        // Give a small delay for better UX feedback
        setTimeout(() => {
            setIsRefreshing(false)
        }, 500)
    }

    const exportToCsv = () => {
        const rowsToExport = selectedRows.map(row => row.original)

        if (rowsToExport.length === 0) return

        // Simple CSV generation
        const headers = ["ID", "Date", "Amount", "Status", "Job Status", "Phone"]
        // @ts-ignore
        const csvContent = [
            headers.join(","),
            ...selectedRows.map(row => {
                // @ts-ignore
                const o = row.original
                return [
                    // @ts-ignore
                    o.id,
                    // @ts-ignore
                    o.created_at,
                    // @ts-ignore
                    o.amount,
                    // @ts-ignore
                    o.status,
                    // @ts-ignore
                    o.job_queue?.status,
                    // @ts-ignore
                    o.phone
                ].map(v => `"${v || ''}"`).join(",")
            })
        ].join("\n")

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", "orders_export.csv")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {/* Job Status Filter */}
                <Select
                    value={(table.getColumn("job_status")?.getFilterValue() as string[])?.[0] ?? "all"}
                    onValueChange={(value) => {
                        if (value === "all") table.getColumn("job_status")?.setFilterValue(undefined)
                        else table.getColumn("job_status")?.setFilterValue([value])
                    }}
                >
                    <SelectTrigger className="h-8 w-[150px]">
                        <SelectValue placeholder="Job Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Jobs</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>

                {/* Order Status Filter */}
                <Select
                    value={(table.getColumn("status")?.getFilterValue() as string[])?.[0] ?? "all"}
                    onValueChange={(value) => {
                        if (value === "all") table.getColumn("status")?.setFilterValue(undefined)
                        else table.getColumn("status")?.setFilterValue([value])
                    }}
                >
                    <SelectTrigger className="h-8 w-[150px]">
                        <SelectValue placeholder="Order Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="collected">Collected</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        {/* Add other statuses if known */}
                    </SelectContent>
                </Select>

                {/* Amount Filter - Simple exact match or text search for now as 'amount' logic varies, 
            but usually it's range. User asked "Filter based on amount". 
            Let's simplistic input for exact/partial match as string or Number range if implemented properly.
            For now, text input for simplicity.
        */}
                <Input
                    placeholder="Filter amount..."
                    value={(table.getColumn("amount")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("amount")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                    onClick={exportToCsv}
                    disabled={table.getFilteredSelectedRowModel().rows.length === 0}
                >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Export CSV
                </Button>
            </div>
        </div>
    )
}
