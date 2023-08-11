import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function LineChart({ chartValues }) {
    console.log("ere");

    return (
        <div className='bg-white p-10 w-full h-full'>
            <Line data={chartValues} />
        </div>
    )

}
