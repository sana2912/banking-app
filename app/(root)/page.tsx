import HeaderBox from "@/components/header_box";
import Right_side_bar from "@/components/rigth-bar";
import BalanceBox from "@/components/totalBalanceBox";

function Home() {
    const username = { username: 'sana' }
    const user_data = {
        $id: "1996",
        email: "sana@gmail.com",
        userId: "sana1996j",
        dwollaCustomerUrl: "sanamansn",
        dwollaCustomerId: "dpspodpds",
        firstName: "sana",
        lastName: "minatozaki",
        name: "sana",
        address1: "12/japan",
        city: "souel",
        state: "korea",
        postalCode: "13326",
        dateOfBirth: "29/12/1996",
        ssn: "jojojoj"
    }
    return (
        <main className="flex w-full h-full px-6">
            <div className="flex flex-col w-full py-4 px-6  bg-fuchsia-50 md:w-7/10">
                <div>
                    <header>
                        <HeaderBox
                            type="greeting"
                            title="sana bank wellcome"
                            subtext="well come to the sana bank inetrnational"
                            user={username.username || 'no account'}
                        />
                    </header>
                </div>
                <div>
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