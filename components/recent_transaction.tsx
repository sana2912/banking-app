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
import { Pagination } from "./pagination";

export default function RecenTransaction(
    {
        accounts,
        appwriteItemId,
        page = 1,
        transactions
    }: RecentTransactionsProps) {
    const row_per_page = 5;
    const all_pages = Math.ceil(transactions.length / row_per_page);
    const index_of_end_page_elenemt = row_per_page * page;
    const index_of_previouse_page_element = index_of_end_page_elenemt - row_per_page;
    const current_transactions_element = transactions.slice(index_of_previouse_page_element, index_of_end_page_elenemt);
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
                                    transactions={current_transactions_element}
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
            <div className="px-8">
                <Pagination
                    page={page}
                    totalPages={all_pages}
                />
            </div>
        </section>
    )
}