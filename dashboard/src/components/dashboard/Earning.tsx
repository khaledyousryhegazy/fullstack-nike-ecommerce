import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend );

export default function Earning() {
    const data = {
        labels: [ '2020', '2021', '2022', '2024', '2025' ],
        datasets: [
            {
                label: 'Total Revenue',
                data: [ 45000, 130000, 260000, 430000 ],
                fill: false,
                backgroundColor: '#60a5fa',
                borderColor: '#60a5fa',
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                },
            },
            y: {
                grid: {
                    color: '#4444444f',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-[180px] mt-[9px] w-full dashboard-box-style">
            <div className="relative h-full">
                <Line data={ data } options={ options } />
            </div>
        </div>
    );
}
