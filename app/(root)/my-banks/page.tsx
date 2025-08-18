import HeaderBox from "@/components/header_box";
import { getLoggedInUser } from "@/lib/server/user_actions";
import { getAccounts } from "@/lib/server/bank_actions";
import BankCards from "@/components/bank_card";

export default async function Mybank() {
    const user_login = await getLoggedInUser();
    const user_accouts = await getAccounts({ userId: user_login.$id });
    if (!user_accouts) return
    const user_data = user_accouts.data;
    return (
        <section className="flex flex-col p-8 gap-8 max-h-screen overflow-auto">
            <header>
                <HeaderBox
                    type='greeting'
                    title="my banks"
                    subtext="see all of ypur bank account"
                    user={user_login ? `${user_login.firstName} ${user_login.lastName}` : 'no account'}
                />
            </header>
            <div className="grid grid-cols-4 gap-4">
                {user_data.map((account: Account, idx: number) => {
                    return (
                        <div key={idx}>
                            <BankCards
                                account={account}
                                userName={`${user_login.firstName} ${user_login.lastName}`}
                                showBalance={true}
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}