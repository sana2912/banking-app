import { formatAmount } from "@/lib/utils";
import Balance_animate from "./balance_animate";
import Donut_chart from "./donut_chart";

export default function BalanceBox({ accounts = [], totalBanks, totalCurrentBalance }: TotlaBalanceBoxProps) {
    return (
        <section className="flex items-center gap-2 mt-4 rounded-[5px] p-2 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] lg:gap-4 lg:mt-6 lg:p-4 ">
            <div className="">
                {/* we will implement circle chart in the future */}
                <Donut_chart
                    accounts={accounts}
                />

            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold lg:text-2xl">Bank account : {totalBanks}</h2>
                <div className="flex flex-col gap-1">
                    <p className="text-ml lg:text-xl">current balance</p>
                    <p className="text-xl lg:text-2xl">
                        <Balance_animate
                            amount={totalCurrentBalance}
                        />
                    </p>
                </div>
            </div>
        </section>
    )
}