import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register necessary Chart.js components
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

export default function Graph() {
    const labels = [ 'Week', 'Month', 'Year', '5 Years' ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sales',
                data: [ 45000, 93000, 180000, 420000 ], // Match the number of labels
                backgroundColor: [ '#60a5fa5f', '#ff00655f', '#ffc1075f', '#ff77555f' ], // Three colors
                borderColor: [ '#60a5fa', '#ff0065', '#ffc107', '#ff7755' ], // Border color
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true, // Show vertical grid lines
                    color: '#4444444f'
                },
            },
            y: {
                grid: {
                    display: true, // Show horizontal grid lines
                    color: '#4444444f'
                },
                beginAtZero: true, // Start Y-axis at zero
            },
        },
    };

    return (
        <div style={ { width: '100%', height: '400px' } } className='my-10'> {/* Set a container size */ }
            <Bar data={ data } options={ options } />
        </div>
    );
}
