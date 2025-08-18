import HeaderBox from "@/components/header_box";
import RecenTransaction from "@/components/recent_transaction";
import Right_side_bar from "@/components/rigth-bar";
import BalanceBox from "@/components/totalBalanceBox";
import { getAccount, getAccounts } from "@/lib/server/bank_actions";
import { getLoggedInUser } from "@/lib/server/user_actions";


async function Home({ searchParams }: SearchParamProps) {
    const { id, page } = await searchParams;
    const currentPage = Number(page as string) || 1;
    const user_login = await getLoggedInUser();
    const user_accouts = await getAccounts({ userId: user_login.$id });
    if (!user_accouts) return
    const appwriteItemId = (id as string) || user_accouts.data[0].appwriteItemId;
    const user_accout = await getAccount({ appwriteItemId });
    const user_data = user_accouts.data;
    return (
        <main className="flex w-full h-full">
            <div className="h-screen overflow-y-auto flex flex-col w-full py-4 md:w-7/10">
                <div className="px-4 lg:px-8">
                    <header>
                        <HeaderBox
                            type="greeting"
                            title="sana bank wellcome"
                            subtext="well come to the sana bank inetrnational"
                            user={user_login ? `${user_login.firstName} ${user_login.lastName}` : 'no account'}
                        />
                    </header>
                </div>
                <div className="px-4 lg:px-8">
                    <BalanceBox
                        accounts={user_data}
                        totalBanks={user_accouts.totalBanks}
                        totalCurrentBalance={user_accouts.totalCurrentBalance}
                    />
                </div>
                <div>
                    <RecenTransaction
                        accounts={user_data}
                        appwriteItemId={appwriteItemId}
                        page={currentPage}
                        transactions={user_accout.transactions}
                    />
                </div>
            </div>
            <div className="hidden h-full bg-sky-50 md:block md:w-3/10">
                <Right_side_bar
                    user={user_login}
                    banks={user_data}
                    transactions={[]}
                />
            </div>
        </main >
    )
}

export default Home;