"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Donut_chart({ accounts }: DoughnutChartProps) {
    const data_set = {
        labels: [
            'bank1',
            'bank2',
            'bank3'
        ],
        datasets: [{
            label: "balance",
            data: [50, 200, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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