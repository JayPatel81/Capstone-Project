import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PirChart({present, absent}) {
   
    const data = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            data: [present,absent],
            backgroundColor: [
              'rgb(6, 162, 35)',
              'rgb(171, 11, 11)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
    return <Pie data={data} />;
}
