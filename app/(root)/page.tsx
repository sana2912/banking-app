import HeaderBox from "@/components/header_box";
import Right_side_bar from "@/components/rigth-bar";
import BalanceBox from "@/components/totalBalanceBox";
import { getLoggedInUser } from "@/lib/server/user_actions";

async function Home() {
    const user_login = await getLoggedInUser();
    const user_data = {
        $id: "1996",
        email: "sana@gmail.com",
        userId: "sana1996j",
        dwollaCustomerUrl: "sanamansn",
        dwollaCustomerId: "dpspodpds",
        firstName: "sana",
        lastName: "minatozaki",
        name: user_login ? user_login.name : "none-user",
        address1: "12/japan",
        city: "souel",
        state: "korea",
        postalCode: "13326",
        dateOfBirth: "29/12/1996",
        ssn: "jojojoj"
    }
    return (
        <main className="flex w-full h-full">
            <div className="flex flex-col w-full py-4  bg-fuchsia-50 md:w-7/10">
                <div className="px-4 lg:px-8">
                    <header>
                        <HeaderBox
                            type="greeting"
                            title="sana bank wellcome"
                            subtext="well come to the sana bank inetrnational"
                            user={user_data.name || 'no account'}
                        />
                    </header>
                </div>
                <div className="px-4 lg:px-8">
                    <BalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={56002}
                    />
                </div>
            </div>
            <div className="hidden h-full bg-sky-50 md:block md:w-3/10">
                <Right_side_bar
                    user={user_data}
                    banks={[]}
                    transactions={[]}
                />
            </div>
        </main >
    )
}

export default Home;