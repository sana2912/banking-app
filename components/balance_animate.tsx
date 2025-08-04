"use client"
import CountUp from "react-countup"

export default function Balance_animate({ amount }: { amount: number }) {
    return (
        <CountUp
            start={100}
            end={amount}
            duration={2}
            decimal=","
            suffix="bath"
        />
    )
}