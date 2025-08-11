import Image from "next/image";
import adding_btn from '../public/icons/plus.svg';
import BankCards from "./bank_card";

// mocking accoutn data 
const mocking: Account = {
    id: "momohirai",
    availableBalance: 26565600,
    currentBalance: 500000,
    officialName: "momo hirai",
    mask: "56566s6s",
    institutionId: "4664fs6fs",
    name: "momo",
    type: "debit card",
    subtype: "debit",
    appwriteItemId: "deuuuhu22323",
    sharableId: "jht54646hth",
};

export default function Right_side_bar({ user, banks, transactions }: RightSidebarProps) {
    return (
        <aside>
            {/* profile section */}
            <section className="felx flex-col">
                <div className="relative w-full h-35 bg-gradient-to-l bg-indigo-200">
                    <div className="absolute flex justify-center items-center bg-white rounded-full w-25 h-25 z-2 top-20 left-10">
                        <div className="flex justify-center items-center bg-amber-200 rounded-full w-23 h-23">
                            <h1 className="text-6xl font-bold text-white">A</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-10 px-6">
                    <h1 className="text-sm font-bold lg:text-xl">{user.name}</h1>
                    <p className="text-[8px]text-neutral-500 lg:text-sm">{user.email}</p>
                </div>
            </section>
            {/* banking array section */}
            <section>
                <div className="flex justify-between px-6 mt-4 items-center">
                    <h2 className="text-sm lg:text-xl font-bold">my banks</h2>
                    <div className="flex gap-2 items-center justify-center cursor-pointer">
                        <h2 className="text-sm lg:text-lg font-medium text-neutral-500">Add bank</h2>
                        <Image
                            src={adding_btn}
                            width={20}
                            height={20}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
                {/* card div */}
                <div>
                    {true && (
                        <div className="relative flex w-80 h-50 justify-center items-center">
                            <div className="absolute w-50 h-30 z-10 lg:w-70 lg:h-45">
                                <BankCards
                                    account={mocking}
                                    userName={user.name}
                                    showBalance={true}
                                />
                            </div>
                            {true && (
                                <div className="absolute w-50h-30 top-5 left-10 lg:w-70 lg:h-45">
                                    <BankCards
                                        account={mocking}
                                        userName={user.name}
                                        showBalance={true}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </aside>
    )
}