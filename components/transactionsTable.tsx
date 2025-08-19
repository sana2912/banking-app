import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

export default function TransactionTable({ transactions }: TransactionTableProps) {
    return (
        <div className="mt-6 w-full">
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="text-[22px] text-neutral-600 border-none">
                        <TableHead className="px-2">Transaction</TableHead>
                        <TableHead className="px-2">Amount</TableHead>
                        <TableHead className="px-2">Status</TableHead>
                        <TableHead className="px-2">Date</TableHead>
                        <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                        <TableHead className="px-2 max-md:hidden">Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction: Transaction, idx) => {
                        const status = getTransactionStatus(new Date(transaction.date));
                        const amount = formatAmount(transaction.amount);

                        const isDebit = transaction.type === 'debit';
                        const isCredit = transaction.type === 'credit';
                        return (
                            <TableRow key={`transactionsTable${idx}`}
                                className={amount[0] === '-' ?
                                    "border-none text-neutral-600 text-[14px] bg-red-50" :
                                    "border-none text-neutral-600 text-[14px]"
                                }
                            >
                                <TableCell className="py-4">{removeSpecialCharacters(transaction.name)}</TableCell>
                                <TableCell className={amount[0] !== '-' ? "text-indigo-500" : "text-red-500"}>
                                    {amount}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 items-center">
                                        <div className={status === 'Success' ? "w-2 h-2 bg-green-400 rounded-full" : "w-2 h-2 bg-neutral-500 rounded-full"}></div>
                                        <p className={status === 'Success' ? "text-green-400" : "text-neutral-500"}>{status}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDateTime(new Date(transaction.date)).dateTime}</TableCell>
                                <TableCell>{transaction.paymentChannel}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}