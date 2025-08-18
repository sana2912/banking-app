import Link from "next/link";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { BankTabItem } from "./bank_tabs";
import BankInfo from "./account_info";
import TransactionTable from "./transactionsTable";

export default function RecenTransaction(
    {
        accounts,
        appwriteItemId,
        page,
        transactions
    }: RecentTransactionsProps) {
    console.log("page :", page);
    return (
        <section className="mt-8 flex flex-col gap-4">
            <header className="flex items-center justify-between px-8">
                <h1 className="text-2xl font-medium">recentransaction</h1>
                <Link
                    className="p-1 bg-indigo-50 rounded-[5px] cursor-pointer hover:bg-indigo-100"
                    href={`/transaction-history/?id=${appwriteItemId}`}>view all</Link>
            </header>
            <div className="w-full justify-center px-8">
                <Tabs defaultValue="account" className="flex flex-col justify-center">
                    <TabsList>
                        {
                            accounts.map((item: Account) => {
                                return (
                                    <TabsTrigger key={item.id} value={item.appwriteItemId}>
                                        <BankTabItem
                                            account={item}
                                            appwriteItemId={appwriteItemId}
                                        />
                                    </TabsTrigger>
                                )
                            })
                        }
                    </TabsList>
                    {accounts.map((item: Account) => {
                        return (
                            <TabsContent key={item.id} value={item.appwriteItemId}>
                                <BankInfo
                                    account={item}
                                    appwriteItemId={appwriteItemId}
                                    type="card"
                                />
                                <TransactionTable
                                    transactions={transactions}
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </section>
    )
}