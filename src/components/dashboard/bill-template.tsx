
import { Button } from "@/components/ui/button"

function formatDate(dateString: string) {
    if (!dateString) return ''
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

export function BillTemplate({ data }: { data: any }) {
    // Handle nested structure: data (db column) -> code -> data -> getBillSummary
    const billSummary = data?.code?.data?.getBillSummary || data?.getBillSummary

    if (!billSummary) return <div>No bill details available.</div>

    const bill = billSummary
    const claims = bill.claims || []

    // Assuming id and is_external come from context or are just placeholders for this template
    // const is_external = false; // logic placeholder
    // const id = "some-id"; // logic placeholder

    // const baseUrl = is_external ? "https://paypostman.com" : "";
    // const url = `${baseUrl}/servicelist/${id}`;

    return (
        <div className="font-sans text-sm md:text-base">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Hi {claims[0]?.patientName?.given},</h1>
            </div>
            <h2 className="text-xl mb-4">Here are your bills.</h2>

            <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                        <span className="inline-block px-3 py-1 text-white bg-red-500 rounded-full text-xs mb-2 uppercase font-semibold">{bill.status}</span>
                        <p className="text-lg font-bold">Amount Due: <span className="text-black">${bill.amountDue}</span></p>
                        <p className="text-sm text-gray-600">for {claims.length} open bills</p>
                    </div>
                    <Button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold h-auto py-3 px-6 rounded-lg opacity-50 cursor-not-allowed">Make a Payment</Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Bill Summary</h3>
                {/* Visual Progress Bar approximation */}
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden flex mb-4">
                    <div className="bg-teal-400 w-[49.7%]" title="Paid by Insurance"></div>
                    <div className="bg-white w-[0.3%]"></div>
                    <div className="bg-green-400 w-[19.7%]" title="Discount"></div>
                    <div className="bg-white w-[0.3%]"></div>
                    <div className="bg-red-500 w-[30%]" title="Amount Due"></div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                        <p>Original cost ({claims.length} bills)</p>
                        <p>$ {bill.originalAmount}</p>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <p>Insurance discount</p>
                        <p>$ {bill.insuranceAdjustmentsAmount}</p>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <p>Insurance paid</p>
                        <p>$ {bill.insurancePaymentsAmount}</p>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <p>You previously paid</p>
                        <p>$ {bill.patientPaymentsAmount}</p>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold border-t pt-2 mt-2">
                        <p>Amount Due</p>
                        <p>$ {bill.amountDue}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Details</h3>
                <p className="text-gray-600 mb-4 text-xs uppercase tracking-wide">Showing oldest to newest</p>

                {claims.map((claim: any, index: number) => (
                    <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="inline-block px-2 py-0.5 text-white bg-red-500 rounded text-[10px] mb-2 uppercase font-medium tracking-wider">{claim?.status}</span>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                            <p className="font-semibold text-gray-900">
                                Bill for {claim?.patientName?.given} {claim?.patientName?.family}'s visit with {claim?.supervisingProviderName} on {formatDate(claim?.claimDate)}
                            </p>
                            <p className="font-bold text-gray-900 whitespace-nowrap">Amount Due: ${claim?.amountDue}</p>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm">{claim?.services?.length} services in this bill:</p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            {claim?.services?.map((service: any, sIdx: number) => (
                                <li key={sIdx}>{service?.description}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
