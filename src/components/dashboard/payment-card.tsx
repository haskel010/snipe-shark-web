
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { PaymentData } from "@/types/database"
import { CreditCard } from "lucide-react"

export function PaymentCard({ data }: { data: PaymentData }) {
    if (!data) return null;

    return (
        <Card className="w-full max-w-sm bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400">
                    Credit Card
                </CardTitle>
                <CreditCard className="h-5 w-5 text-neutral-400" />
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                <div className="space-y-1">
                    <p className="text-2xl font-mono tracking-widest text-neutral-100">
                        {data.cardNumber || "**** **** **** ****"}
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider">Card Holder</p>
                        <p className="text-sm font-medium uppercase truncate max-w-[150px]">{data.cardHolder || "Unknown"}</p>
                    </div>
                    <div className="space-y-1 text-right">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider">Expires</p>
                        <p className="text-sm font-medium">{data.expiry || "**/**"}</p>
                    </div>
                </div>

                {/* Billing Info Details visible only in this view context probably, or maybe as a flip? 
            For now, let's list extra details below nicely 
        */}
            </CardContent>
            <CardFooter className="bg-neutral-950/30 p-4 grid grid-cols-2 gap-4 text-xs text-neutral-400">
                <div>
                    <span className="block text-neutral-600">CVV</span>
                    {data.cvv}
                </div>
                <div>
                    <span className="block text-neutral-600">Zip</span>
                    {data.zipCode}
                </div>
                <div className="col-span-2">
                    <span className="block text-neutral-600">Billing Address</span>
                    {data.streetAddress}, {data.city}, {data.state}
                </div>
            </CardFooter>
        </Card>
    )
}
