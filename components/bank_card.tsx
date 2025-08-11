import paypass from "../public/icons/Paypass.svg"
import mastercard from "../public/icons/mastercard.svg"
import lines from "../public/icons/Lines.svg"
import Image from "next/image"

export default function BankCards({ account, userName, showBalance }: CreditCardProps) {
    return (
        <div className="flex justify-between w-50 h-30 rounded-[10px] bg-purple-800 lg:w-70 lg:h-45">
            {/* infomation side */}
            <div className="high-full w-6/8 flex flex-col justify-between p-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[12px] font-medium text-white lg:text-[16px]">{userName}</h2>
                    {showBalance && (
                        <h2 className="text-[12px] font-medium text-white lg:text-[16px]">${account.currentBalance}</h2>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <h2 className="text-[8px] font-medium text-white lg:text-[12px]">{userName}</h2>
                        <h2 className="text-[8px] font-medium text-white lg:text-[12px]">***/***</h2>
                    </div>
                    <h2 className="text-[12px] font-medium text-white lg:text-[16px]">
                        **** **** **** <span>{1234}</span>
                    </h2>
                </div>
            </div>
            {/* image side */}
            <div className="flex flex-col justify-between items-end h-full w-2/8 bg-indigo-400 rounded-r-[10px] p-2">
                <div>
                    <Image
                        src={paypass}
                        width={25}
                        height={25}
                        alt="paypass"
                    />
                </div>
                <div className="w-full bg-indigo-200">
                    <Image
                        src={mastercard}
                        width={40}
                        height={40}
                        alt="paypass"
                    />
                </div>
            </div>
        </div>
    )
}