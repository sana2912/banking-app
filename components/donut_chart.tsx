"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
function getRandomRGB(): string {
    const r = Math.floor(Math.random() * 256); // 0–255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
function getMultipleRandomRGB(count: number): string[] {
    return Array.from({ length: count }, getRandomRGB);
}
export default function Donut_chart({ accounts }: DoughnutChartProps) {
    const account_name = accounts.map((item) => item.name);
    const account_data = accounts.map((item) => item.currentBalance);
    const random_color = getMultipleRandomRGB(accounts.length);
    console.log(random_color);
    const data_set = {
        labels: account_name,
        datasets: [{
            label: "balance",
            data: account_data,
            backgroundColor: random_color,
            hoverOffset: 4
        }]
    }
    return (
        <div className="w-20 h-20 lg:w-40 lg:h-40">
            <Doughnut
                data={
                    data_set
                }
                options={{
                    cutout: '50%',
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                }}

            />
        </div>
    )
}