import HeaderBox from "@/components/header_box";
import PaymentTransferForm from "@/components/paymentTranferform";
import { getLoggedInUser } from "@/lib/server/user_actions";
import { getAccounts } from "@/lib/server/bank_actions";

export default async function Payment_History() {
    const user_login = await getLoggedInUser();
    const user_accouts = await getAccounts({ userId: user_login.$id });
    if (!user_accouts) return
    const user_data = user_accouts.data;
    return (
        <section className="flex flex-col p-8 max-h-screen overflow-auto">
            <header>
                <HeaderBox
                    title="transfer"
                    subtext="put your detail and make transaction here"
                />
            </header>
            <div className="flex mt-8">
                <PaymentTransferForm
                    accounts={user_data}
                />
            </div>
        </section>
    )
}