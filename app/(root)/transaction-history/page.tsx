import HeaderBox from "@/components/header_box";
import { getLoggedInUser } from "@/lib/server/user_actions";
import { getAccount, getAccounts } from "@/lib/server/bank_actions";
import TransactionTable from "@/components/transactionsTable";

export default async function Transac_history({ searchParams }: SearchParamProps) {
    const { id, page } = await searchParams;
    const currentPage = Number(page as string) || 1;
    const user_login: User = await getLoggedInUser();
    const user_accouts = await getAccounts({ userId: user_login.$id });
    if (!user_accouts) return
    const appwriteItemId = id ? (id as string) : user_accouts.data[0].appwriteItemId;
    const user_accout = await getAccount({ appwriteItemId });//ยังเป็น static data อย่าลืมเปลี่ยนเป็น dynamic data ที่ดึงมาจาก database
    const user_data: Account = user_accout.data;
    return (
        <section className="h-screen overflow-y-auto flex flex-col p-8 w-full">
            <header>
                <HeaderBox
                    title="Transaction history"
                    subtext="your all transaction history and detail"
                    type="greeting"
                    user={user_login.name}
                />
            </header>
            <section className="mt-6 p-4 bg-indigo-400 rounded-2xl flex justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] text-white ">{user_data.name}</p>
                    <p className="text-[16px] text-white ">{user_data.officialName}</p>
                    <p className="text-[16px] text-white ">
                        **** **** **** <span>{user_data.mask}</span>
                    </p>
                </div>
                <div className="flex flex-col bg-indigo-300 p-2 rounded-[5px] justify-center items-center gap-4">
                    <p className="text-[16px] text-white ">current Balance</p>
                    <p className="text-[20px] text-white font-bold">{`${user_data.currentBalance}$`}</p>
                </div>
            </section>
            <div className="flex">
                <TransactionTable
                    transactions={user_accout.transactions}
                />
            </div>
        </section>
    )
}